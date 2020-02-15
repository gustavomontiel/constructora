import { MaterialesUpdateComponent } from './materiales-update/materiales-update.component';
import { MaterialesListComponent } from './materiales-list/materiales-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';
import { MaterialesCreateComponent } from './materiales-create/materiales-create.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'materiales',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'materiales-list',
        component: MaterialesListComponent,
        data: {
          title: 'Listado de materiales',
          rolesPermitidos: []
        }
      },
      {
        path: 'materiales-create',
        component: MaterialesCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear material',
          rolesPermitidos: []
        }
      },
      {
        path: 'materiales-update/:id',
        component: MaterialesUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar material',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'materiales-list'},
      { path: '**', redirectTo: 'materiales-list'}

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }
