import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenericCrudService {

  public urlApiServices;

  constructor(
    private http: HttpClient,
  ) {
    console.log('se generó GenericCrudService');
    this.urlApiServices = environment.urlApiServices;
  }

  getItems( url: string, viewLoading = true ) {

    if ( viewLoading ) {
      Swal.fire({
        text: 'Buscando datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    }

    const urlApi = this.urlApiServices + url;

    return this.http.get( urlApi ).pipe(
      map( ( resp: any ) => {
        // tslint:disable-next-line: no-unused-expression
        viewLoading && Swal.close();
        return resp;
      }),
      catchError( err => {
        // tslint:disable-next-line: no-unused-expression
        viewLoading && Swal.close();
        return this.printError(err);
      })
    );
  }


  getItemById( url: string, id: string, viewLoading = true ) {

    if ( viewLoading ) {
      Swal.fire({
        text: 'Buscando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    }

    const urlApi = this.urlApiServices + url + '/' + id;

    return this.http.get( urlApi ).pipe(
      map( ( resp: any ) => {
        // tslint:disable-next-line: no-unused-expression
        viewLoading && Swal.close();
        return resp;
      }),
      catchError( err => {
        // tslint:disable-next-line: no-unused-expression
        viewLoading && Swal.close();
        return this.printError(err);
      })
    );
  }


  createItem( url: string, item: any, viewLoading = true ) {

    if ( viewLoading ) {
      Swal.fire({
        text: 'Creando registro',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    }

    const urlApi = this.urlApiServices + url;

    return this.http.post( urlApi, item )
      .pipe(
        map( ( resp: any ) => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return resp;
        }),
        catchError( err => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return this.printError(err);
        })
      );
  }


  updateItem( url: string, item: any, viewLoading = true ) {

    if ( item.id ) {
      if ( viewLoading ) {
        Swal.fire({
          text: 'Actualizando Datos',
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        });
      }

      const urlApi = this.urlApiServices + url + '/' + item.id;

      return this.http.put( urlApi, item )
      .pipe(
        map((resp: any) => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return resp;
        }),
        catchError( err => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return this.printError(err);
        })
      );
    } else {
      const err = { error: { message: 'no se puede actualizar un objeto sin id' } };
      this.printError(err);
    }
  }


  deleteItem( url: string, id: string, viewLoading = true ) {

    if ( viewLoading ) {
      Swal.fire({
        text: 'Procesando solicitud',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    }

    const urlApi = this.urlApiServices + url + '/' + id;

    return this.http.delete( urlApi )
      .pipe(
        map(( resp: any ) => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return resp;
        }),
        catchError( err => {
          // tslint:disable-next-line: no-unused-expression
          viewLoading && Swal.close();
          return this.printError(err);
        })
      );

  }


  async printError( err: any ) {
    console.error( 'Mensaje de error:', err );
    if ( err.error && err.error.message ) {
      await Swal.fire({
        title: 'Mensaje del servicio',
        text: err.error.message,
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then((result) => {
        console.log(result);
      });
    }
    return throwError( err );
  }

}
