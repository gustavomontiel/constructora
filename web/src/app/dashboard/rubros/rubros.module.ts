import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubrosRoutingModule } from './rubros-routing.module';
import { RubrosListComponent } from './rubros-list/rubros-list.component';
import { RubrosCreateComponent } from './rubros-create/rubros-create.component';
import { RubrosUpdateComponent } from './rubros-update/rubros-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RubrosListComponent, RubrosCreateComponent, RubrosUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    RubrosRoutingModule
  ]
})
export class RubrosModule { }
