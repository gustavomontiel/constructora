import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate.guard';


const usuariosRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'lista-usuarios',
        component: UsuariosListComponent,
        data: {
          title: 'Listado usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'crear-usuario',
        component: CrearUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'editar-usuario/:id',
        component: EditarUsuarioComponent,
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
      { path: '', redirectTo: 'lista-usuarios'},
      { path: '**', redirectTo: 'lista-usuarios'}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
