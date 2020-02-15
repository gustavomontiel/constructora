import { MaterialesService } from './../materiales.service';
import { Material } from './../../../shared/models/material.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-materiales-update',
  templateUrl: './materiales-update.component.html',
  styleUrls: ['./materiales-update.component.scss']
})
export class MaterialesUpdateComponent implements OnInit {

  material: Material;
  forma: FormGroup;

  constructor(
    public materialesService: MaterialesService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      rubro: new FormControl(null, Validators.required),
      grupo: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.materialesService.getItemById(id)
      .subscribe(resp => {
        this.material = resp.data;
        console.log(this.material);
        this.forma.setValue({
          codigo: this.material.codigo,
          descripcion: this.material.descripcion,
          unidad: this.material.unidad,
          rubro: this.material.rubro,
          grupo: this.material.grupo,
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

        const item = { ... this.forma.value, id: this.material.id };

        this.materialesService.updateItem(item).subscribe(
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
