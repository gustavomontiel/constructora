import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosCreateComponent } from './pedidos-create/pedidos-create.component';
import { PedidosUpdateComponent } from './pedidos-update/pedidos-update.component';
import { PedidosViewComponent } from './pedidos-view/pedidos-view.component';


@NgModule({
  declarations: [PedidosListComponent, PedidosCreateComponent, PedidosUpdateComponent, PedidosViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
