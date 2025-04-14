import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FloresComponent } from './components/flores/flores.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'flores', component: FloresComponent, canActivate: [authGuard] },
  { path: 'ordenes', component: OrdenesComponent, canActivate: [authGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];