import { Component, OnInit } from '@angular/core';
import { NOMBRE_APP } from '../../shared/config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  nombreApp = NOMBRE_APP;
  forma: FormGroup;
  mensaje: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });

  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      return pass1 === pass2 ? null : { sonIguales: true };

    };

  }


  registrarUsuario() {

    this.mensaje = null;

    if (this.forma.invalid) {
      console.log('error');
      console.log(this.forma);
      return;
    }

    const usuario = {
      name: this.forma.value.name,
      username: this.forma.value.username,
      email: this.forma.value.email,
      password: this.forma.value.password
    };

    this.authService.registrarUsuario(usuario)
      .subscribe(
        correcto => {
          console.log(correcto);
          this.router.navigate(['/auth/login']);
        },
        error => {

          if (error instanceof HttpErrorResponse) {

            const validationErrors = error.error;

            if (error.status === 422) {
              this.mensaje = 'Ha ocurrido un error';
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.forma.get(prop);
                if (formControl) {
                  formControl.setErrors({
                    serverError: validationErrors[prop]
                  });
                }
              });
            } else {
              this.mensaje = error.error.message;
            }

          }
        }
      );

  }

}
