import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';
import { ObrasListComponent } from './obras-list/obras-list.component';
import { ObrasCreateComponent } from './obras-create/obras-create.component';
import { ObrasUpdateComponent } from './obras-update/obras-update.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'obras',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'obras-list',
        component: ObrasListComponent,
        data: {
          title: 'Listado de obras',
          rolesPermitidos: []
        }
      },
      {
        path: 'obras-create',
        component: ObrasCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear obra',
          rolesPermitidos: []
        }
      },
      {
        path: 'obras-update/:id',
        component: ObrasUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar obra',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'obras-list'},
      { path: '**', redirectTo: 'obras-list'}

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObrasRoutingModule { }
