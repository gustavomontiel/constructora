import { HerramientasService } from './../herramientas.service';
import { Herramienta } from './../../../shared/models/herramienta.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-herramientas-update',
  templateUrl: './herramientas-update.component.html',
  styleUrls: ['./herramientas-update.component.scss']
})
export class HerramientasUpdateComponent implements OnInit {

  herramienta: Herramienta;
  forma: FormGroup;

  constructor(
    public herramientasService: HerramientasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      observacion: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.herramientasService.getItemById(id)
      .subscribe(resp => {
        this.herramienta = resp.data;
        console.log(this.herramienta);
        this.forma.setValue({
          codigo: this.herramienta.codigo,
          nombre: this.herramienta.nombre,
          descripcion: this.herramienta.descripcion,
          estado: this.herramienta.estado,
          observacion: this.herramienta.observacion
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

        const item = { ... this.forma.value, id: this.herramienta.id };

        this.herramientasService.updateItem(item).subscribe(
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
