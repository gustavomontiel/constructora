import { PedidosViewComponent } from './pedidos-view/pedidos-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosCreateComponent } from './pedidos-create/pedidos-create.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate.guard';
import { PedidosUpdateComponent } from './pedidos-update/pedidos-update.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'pedidos',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'pedidos-list',
        component: PedidosListComponent,
        data: {
          title: 'Listado de pedidos',
          rolesPermitidos: []
        }
      },
      {
        path: 'pedidos-create',
        component: PedidosCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear pedido',
          rolesPermitidos: []
        }
      },
      {
        path: 'pedidos-update/:id',
        component: PedidosUpdateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar pedido',
          rolesPermitidos: []
        }
      },
      {
        path: 'pedidos-view/:id',
        component: PedidosViewComponent,
        canDeactivate: [],
        data: {
          title: 'Ver pedido',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'pedidos-list'},
      { path: '**', redirectTo: 'pedidos-list'}

    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
