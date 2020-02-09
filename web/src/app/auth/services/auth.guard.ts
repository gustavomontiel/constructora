import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor(
    private authService: AuthService,
    public router: Router
  ) {

  }

  canActivate() {
    if ( this.authService.estaLogueado() ) {
      console.log( 'PASO EL LoginGuard');
      return true;
    } else {
      console.log( 'Bloqueado por LoginGuard' );
      this.router.navigate(['/auth', 'login']);
      return false;
    }
  }

  canActivateChild() {
    return this.canActivate();
  }

}
