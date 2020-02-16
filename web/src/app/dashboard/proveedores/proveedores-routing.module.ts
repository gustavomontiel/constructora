import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate.guard';
import { ProveedoresUpdateComponent } from './proveedores-update/proveedores-update.component';
import { ProveedoresCreateComponent } from './proveedores-create/proveedores-create.component';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'proveedores',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'proveedores-list',
        component: ProveedoresListComponent,
        data: {
          title: 'Listado de proveedores',
          rolesPermitidos: []
        }
      },
      {
        path: 'proveedores-create',
        component: ProveedoresCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear proveedor',
          rolesPermitidos: []
        }
      },
      {
        path: 'proveedores-update/:id',
        component: ProveedoresUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar proveedor',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'proveedores-list'},
      { path: '**', redirectTo: 'proveedores-list'}

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
