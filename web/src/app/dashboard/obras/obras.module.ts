import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObrasRoutingModule } from './obras-routing.module';
import { ObrasListComponent } from './obras-list/obras-list.component';
import { ObrasCreateComponent } from './obras-create/obras-create.component';
import { ObrasUpdateComponent } from './obras-update/obras-update.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ObrasListComponent,
    ObrasCreateComponent,
    ObrasUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    ObrasRoutingModule
  ]
})
export class ObrasModule { }
