import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerramientasCreateComponent } from './herramientas-create/herramientas-create.component';
import { HerramientasUpdateComponent } from './herramientas-update/herramientas-update.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate.guard';
import { HerramientasListComponent } from './herramientas-list/herramientas-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'herramientas',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'herramientas-list',
        component: HerramientasListComponent,
        data: {
          title: 'Listado de herramientas',
          rolesPermitidos: []
        }
      },
      {
        path: 'herramientas-create',
        component: HerramientasCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear obra',
          rolesPermitidos: []
        }
      },
      {
        path: 'herramientas-update/:id',
        component: HerramientasUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar obra',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'herramientas-list'},
      { path: '**', redirectTo: 'herramientas-list'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerramientasRoutingModule { }
