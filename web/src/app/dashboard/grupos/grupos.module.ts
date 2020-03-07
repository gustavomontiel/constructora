import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposListComponent } from './grupos-list/grupos-list.component';
import { GruposCreateComponent } from './grupos-create/grupos-create.component';
import { GruposUpdateComponent } from './grupos-update/grupos-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GruposListComponent, GruposCreateComponent, GruposUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    GruposRoutingModule
  ]
})
export class GruposModule { }
