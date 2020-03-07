import { ProveedoresService } from './../proveedores.service';
import { Proveedor } from './../../../shared/models/proveedor.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proveedores-create',
  templateUrl: './proveedores-create.component.html',
  styleUrls: ['./proveedores-create.component.scss']
})
export class ProveedoresCreateComponent implements OnInit {

  proveedor: Proveedor;
  forma: FormGroup;

  constructor(
    public proveedoresService: ProveedoresService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      cuit: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      telefono: new FormControl(null),
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
      cuenta_corriente: new FormControl(true),
    });
  }

  crearProveedor() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };
        console.log(item);

        this.proveedoresService.createItem(item).subscribe(
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
              url.push('obras-list');
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
