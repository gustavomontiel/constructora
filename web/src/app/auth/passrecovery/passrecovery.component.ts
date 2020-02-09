import { Component, OnInit } from '@angular/core';
import { NOMBRE_APP } from './../../config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.component.html',
  styles: []
})
export class PassrecoveryComponent implements OnInit {

  nombreApp = NOMBRE_APP;
  forma: FormGroup;
  cargando = false;
  mensaje: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      email: new FormControl( null, [Validators.required, Validators.email] ),
    });
  }

  recuperarPassword() {
    this.mensaje = null;

    if (this.forma.invalid) {
      console.log('error');
      console.log(this.forma);
      return;
    }

    this.authService.recuperarPassword( this.forma.value )
    .subscribe(
      correcto => {
        this.cargando = false;
        console.log(correcto);
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.cargando = false;
        this.mensaje = error.error.message ? error.error.message : error.message;
      }
    )
  }

}
