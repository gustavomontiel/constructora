import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerramientasRoutingModule } from './herramientas-routing.module';
import { HerramientasListComponent } from './herramientas-list/herramientas-list.component';
import { HerramientasCreateComponent } from './herramientas-create/herramientas-create.component';
import { HerramientasUpdateComponent } from './herramientas-update/herramientas-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HerramientasListComponent,
    HerramientasCreateComponent,
    HerramientasUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HerramientasRoutingModule
  ]
})
export class HerramientasModule { }
