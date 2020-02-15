import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../shared/models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios-update',
  templateUrl: './usuarios-update.component.html',
  styleUrls: ['./usuarios-update.component.scss']
})
export class UsuariosUpdateComponent implements OnInit {

  usuario: Usuario;
  forma: FormGroup;

  constructor(
    public usuariosService: UsuariosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // rol: new FormControl(null, [Validators.required]),
      password: new FormControl(null),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.usuariosService.getItemById(id)
      .subscribe(resp => {
        this.usuario = resp.data;
        console.log(this.usuario);
        this.forma.setValue({
          name: this.usuario.name,
          username: this.usuario.username,
          email: this.usuario.email,
          password: ''
          // roleNames: this.usuario.roleNames[0] ? this.usuario.roleNames[0] : '',
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

        const item = { ... this.forma.value, id: this.usuario.id } as Usuario;
        item.password = item.password.length < 3 ? null : item.password;

        this.usuariosService.updateItem(item).subscribe(
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
