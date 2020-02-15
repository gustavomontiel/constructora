import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios-create/usuarios-create.component';
import { UsuariosUpdateComponent } from './usuarios-update/usuarios-update.component';
import { ProfileComponent } from './profile/profile.component';


const usuariosRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'usuarios-list',
        component: UsuariosListComponent,
        data: {
          title: 'Listado de usuarios',
          rolesPermitidos: []
        }
      },
      {
        path: 'usuarios-create',
        component: UsuariosCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'usuarios-update/:id',
        component: UsuariosUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Mi Perfil',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'usuarios-list'},
      { path: '**', redirectTo: 'usuarios-list'}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
