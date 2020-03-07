import { ObrasService } from './../obras.service';
import { Obra } from './../../../shared/models/obra.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-obras-update',
  templateUrl: './obras-update.component.html',
  styleUrls: ['./obras-update.component.scss']
})
export class ObrasUpdateComponent implements OnInit {

  obra: Obra;
  forma: FormGroup;

  constructor(
    public obrasService: ObrasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.obrasService.getItemById(id)
      .subscribe(resp => {
        this.obra = resp.data;
        console.log(this.obra);
        this.forma.setValue({
          nombre: this.obra.nombre,
          descripcion: this.obra.descripcion,
          direccion: new FormGroup({
            tipo: new FormControl('REAL', Validators.required),
            calle: new FormControl(null, Validators.required),
            numero: new FormControl(null),
            piso: new FormControl(null),
            departamento: new FormControl(null),
            localidad: new FormControl(null, Validators.required),
            provincia: new FormControl(null, Validators.required),
            pais: new FormControl(null, Validators.required),
          }),
        });
      }
      );
  }

  updateItem() {

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const item = { ... this.forma.value, id: this.obra.id };

        this.obrasService.updateItem(item).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
            this.forma.markAsPristine();
          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.',
              'error'
            );
          }
        );
      }
    });

  }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

    if ( this.forma.dirty ) {
      return Swal.fire({
        title: 'Salir',
        text: 'Confirma salir y perder los cambios?',
        icon: 'question',
        showCancelButton: true,
      }).then(( result ) => {
        console.log('result', result.value);
        return result.value ? result.value : false;
      });
    } else {
      return true;
    }

  }

}
