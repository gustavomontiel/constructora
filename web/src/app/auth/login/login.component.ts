import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NOMBRE_APP } from './../../config/config';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  nombreApp = NOMBRE_APP;
  cargando = false;
  mensaje: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      // email: new FormControl(localStorage.getItem('username'), [Validators.required, Validators.email]),
      username: new FormControl(localStorage.removeItem('username'), Validators.required),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(localStorage.getItem('rememberMe'))
    });

    this.navegar();

  }

  navegar() {

    if ( this.authService.estaLogueado() === true) {
      this.router.navigate(['/dashboard/home']);
    }
  }

  login() {

    this.mensaje = null;

    if (this.forma.invalid) {
      console.log('error');
      console.log(this.forma);
      return;
    }

    localStorage.removeItem('username');
    localStorage.removeItem('rememberMe');

    if ( this.forma.controls.rememberMe.value ) {
      // localStorage.setItem('username', this.forma.controls.email.value );
      localStorage.setItem('username', this.forma.controls.username.value );
      localStorage.setItem('rememberMe', this.forma.controls.rememberMe.value );
    }

    this.cargando = true;

    this.authService.login(this.forma.value)
      .subscribe(
        correcto => {
          this.cargando = false;
          console.log(correcto);
          this.navegar();
        },
        error => {
          this.cargando = false;
          if (error instanceof HttpErrorResponse) {

            const validationErrors = error.error;

            if (error.status === 422) {
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
          } else {
            this.mensaje = error;
          }

        }
      );

  }

}
