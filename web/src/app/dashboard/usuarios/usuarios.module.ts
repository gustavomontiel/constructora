import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
import { MaterialModule } from 'src/app/shared/material.module';

// rutas
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios-create/usuarios-create.component';
import { UsuariosUpdateComponent } from './usuarios-update/usuarios-update.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    UsuariosListComponent,
    ProfileComponent,
    UsuariosCreateComponent,
    UsuariosUpdateComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ],
  providers: [],
})

export class UsuariosdModule { }
