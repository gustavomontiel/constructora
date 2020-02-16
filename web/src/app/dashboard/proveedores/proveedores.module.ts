import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component';
import { ProveedoresCreateComponent } from './proveedores-create/proveedores-create.component';
import { ProveedoresUpdateComponent } from './proveedores-update/proveedores-update.component';


@NgModule({
  declarations: [
    ProveedoresListComponent,
    ProveedoresCreateComponent,
    ProveedoresUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    ProveedoresRoutingModule
  ]
})
export class ProveedoresModule { }
