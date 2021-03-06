import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesListComponent } from './materiales-list/materiales-list.component';
import { MaterialesCreateComponent } from './materiales-create/materiales-create.component';
import { MaterialesUpdateComponent } from './materiales-update/materiales-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    MaterialesListComponent,
    MaterialesCreateComponent,
    MaterialesUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialesRoutingModule
  ]
})
export class MaterialesModule { }
