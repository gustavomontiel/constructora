import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<PuedeDesactivar>  {

  canDeactivate(component: PuedeDesactivar) {
    console.log('canDeactivate', component.permitirSalirDeRuta());
    return component.permitirSalirDeRuta ? component.permitirSalirDeRuta() : true;
  }

}
