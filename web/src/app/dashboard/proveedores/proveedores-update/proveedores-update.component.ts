import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/shared/models/proveedor.model';
import { ProveedoresService } from '../proveedores.service';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-proveedores-update',
  templateUrl: './proveedores-update.component.html',
  styleUrls: ['./proveedores-update.component.scss']
})
export class ProveedoresUpdateComponent implements OnInit {

  proveedor: Proveedor;
  forma: FormGroup;

  constructor(
    public proveedoresService: ProveedoresService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      cuit: new FormControl(null),
      nombre: new FormControl(null, Validators.required),
      telefono: new FormControl(null),
      direccion: new FormGroup({
        tipo: new FormControl('REAL', Validators.required),
        calle: new FormControl(null),
        numero: new FormControl(null),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl(null, Validators.required),
        provincia: new FormControl(null, Validators.required),
        pais: new FormControl(null, Validators.required),
      }),
      cuenta_corriente: new FormControl(true),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.proveedoresService.getItemById(id)
      .subscribe(resp => {
        this.proveedor = resp.data;

        this.forma.setValue({
          cuit: this.proveedor.cuit,
          nombre: this.proveedor.nombre,
          telefono: this.proveedor.telefono,
          direccion: this.proveedor.direccion,
          cuenta_corriente: this.proveedor.cuenta_corriente,
        });
      }
      );
  }

  updateItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const item = { ... this.forma.value, id: this.proveedor.id };

        this.proveedoresService.updateItem(item).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
            this.forma.markAsPristine();
          },
          error => {
            // tslint:disable-next-line: no-unused-expression
            (error instanceof HttpErrorResponse) && this.formErrorHandlerService.fromServer(this.forma, error);
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
