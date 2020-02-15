import { HerramientasService } from './../herramientas.service';
import { Herramienta } from './../../../shared/models/herramienta.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-herramientas-create',
  templateUrl: './herramientas-create.component.html',
  styleUrls: ['./herramientas-create.component.scss']
})
export class HerramientasCreateComponent implements OnInit {

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
  }

  crearUsuario() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };
        console.log(item);

        this.herramientasService.createItem(item).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              this.forma.markAsPristine();
              const url = this.router.url.split('/');
              url.pop();
              url.push('herramientas-list');
              this.router.navigateByUrl(url.join('/'));
              console.log(url);
            });
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
