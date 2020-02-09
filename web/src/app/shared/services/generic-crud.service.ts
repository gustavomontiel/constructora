import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenericCrudService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  getItems( url: string ) {

    Swal.fire({
      text: 'Buscando datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const urlApi = environment.urlApiServices + url;

    return this.http.get( urlApi ).pipe(
      map( ( resp: any ) => {
        Swal.close();
        return resp;
      })
    );
  }

  getItemById( url: string, id: string ) {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const urlApi = environment.urlApiServices + url + '/' + id;

    return this.http.get( urlApi ).pipe(
      map( ( resp: any ) => {
        Swal.close();
        return resp;
      })
    );
  }

  createItem( url: string, item: any ) {

    Swal.fire({
      text: 'Creando registro',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const urlApi = environment.urlApiServices + url;

    return this.http.post( urlApi, item )
      .pipe(
        map( ( resp: any ) => {
          Swal.close();
          return resp;
        }),
        catchError( err => {
          console.log( 'error:', err );
          Swal.close();
          return throwError( err );
        })
      );
  }

  updateItem( url: string, item: any ) {

    if ( item.id ) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      const urlApi = environment.urlApiServices + url + '/' + item.id;

      return this.http.put( urlApi, item )
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        }),
        catchError( err => {
          console.log( 'Error:', err );
          Swal.close();
          return throwError( err );
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }


  deleteItem( url: string, id: string ) {

    Swal.fire({
      text: 'Procesando solicitud',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const urlApi = environment.urlApiServices + url + '/' + id;

    return this.http.delete( urlApi )
      .pipe(
        map(( resp: any ) => {
          Swal.close();
          return resp;
        })
      );

  }
}
