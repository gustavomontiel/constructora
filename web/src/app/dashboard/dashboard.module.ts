import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Angular Material
import { MaterialModule } from '../shared/material.module';

// rutas
import { DashboardRoutingModule } from './dashboard-routing.module';

import { LayoutModule } from './layout/layout.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ToastComponent } from '../shared/components/toasts/toast.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ToastComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    SweetAlert2Module,
    MaterialModule,
    DashboardRoutingModule,
    LayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})

export class DashboardModule { }
