import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formDatos: FormGroup;
  formPassword: FormGroup;
  mensaje: string;


  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    this.formDatos = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.formPassword = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, { validators: this.sonIguales('password', 'password2') });

  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      return pass1 === pass2 ? null : { sonIguales: true };

    };

  }

  cambiarPassword() {
    console.log('cambiarPassword()');
    if (this.formPassword.invalid) {
      console.log('error');
      console.log(this.formDatos);
      return;
    }
    const usuario = {
      password: this.formPassword.value.password
    };

  }

  guardarUsuario() {

    this.mensaje = null;

    if (this.formDatos.invalid) {
      console.log('error');
      console.log(this.formDatos);
      return;
    }

    const usuario = {
      name: this.formDatos.value.name,
    };

  }

}
