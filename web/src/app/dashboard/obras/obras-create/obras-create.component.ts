import { ObrasService } from './../obras.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Obra } from 'src/app/shared/models/obra.model';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-obras-create',
  templateUrl: './obras-create.component.html',
  styleUrls: ['./obras-create.component.scss']
})
export class ObrasCreateComponent implements OnInit {

  obra: Obra;
  forma: FormGroup;

  constructor(
    public obrasService: ObrasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      direccion: new FormGroup({
        tipo: new FormControl('REAL', Validators.required),
        calle: new FormControl(null, Validators.required),
        numero: new FormControl(null),
        piso: new FormControl(null),
        departamento: new FormControl(null),
        localidad: new FormControl('Posadas', Validators.required),
        provincia: new FormControl('Misiones', Validators.required),
        pais: new FormControl('Argentina', Validators.required),
      }),
    });

  }

  createItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };

        this.obrasService.createItem(item).subscribe(
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
            });
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
