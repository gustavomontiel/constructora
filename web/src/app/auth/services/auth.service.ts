import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  token = '';

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.inicializar();
  }

  inicializar() {
    this.token = sessionStorage.getItem('token') || '';
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
  }

  limpiar() {
    this.usuario = null;
    this.token = '';
    sessionStorage.clear();
    localStorage.removeItem('usuario');
  }

  registrarUsuario(usuario: any) {

    const url = environment.urlApiServices + '/auth/register';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        console.log(resp);
        return true;
      }),
      catchError(err => {
        console.log('error', err);
        return throwError(err);
      })
    );

  }

  recuperarPassword(email: string) {

    const url = environment.urlApiServices + '/auth/passrecovery';
    return this.http.post(url, email).pipe(
      map((resp: any) => {
        console.log(resp);
        return resp;
      }),
      catchError(err => {
        console.log('error', err);
        return throwError(err);
      })
    );

  }

  login(usuario: any) {

    const url = environment.urlApiServices + '/auth/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        console.log('login', resp);
        sessionStorage.setItem('token', resp.data.token);
        localStorage.setItem('usuario', JSON.stringify(resp.data.user));
        this.inicializar();
        return true;
      }),
      catchError(err => {
        console.log('error', err);
        return throwError(err);
      })
    );

  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  getRoles() {
    return this.usuario ? this.usuario.roleNames : false;
  }

  logout() {
    this.limpiar();
    this.router.navigate(['/login']);
  }

  hasRole(roleNname: string) {
    return this.usuario.roleNames.includes(roleNname);
  }

  isAdmin() {
    return this.usuario ? this.usuario.roleNames.includes('administrador') : false;
  }

  renuevaToken() {

    let url = environment.urlApiServices + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url ).pipe(
                map( (resp: any) => {
                  this.token = resp.token;
                  sessionStorage.setItem('token', this.token );
                  console.log('Token renovado');

                  return true;
                }),
                catchError( err => {
                  console.log( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
                  this.logout();
                  return throwError(err);
                }));


  }


}
