import { ProfileComponent } from './usuarios/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { HomeComponent } from './home/home.component';

const dashboardRoutes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'home',
        data: {
          title: ''
        },
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        data: {
          title: ''
        },
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosdModule ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
