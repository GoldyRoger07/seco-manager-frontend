import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { SignupComponent } from './features/signup/signup.component';
import { SigninComponent } from './features/signin/signin.component';
// import { SignupComponent } from './features/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //   // Nous créerons ces composants ensuite
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'menu',  loadComponent: () => import('./features/menu/menu-management.component').then(m => m.MenuManagementComponent)},
      { path: 'orders',  loadComponent: () => import('./features/order/order-manager.component').then(m => m.OrderManagerComponent)},
      { path: 'tables',  loadComponent: () => import('./features/tables/table-management.component').then(m => m.TableManagementComponent)},
      { path: 'settings',  loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)},
      { path: 'images-manager',  loadComponent: () => import('./features/image-manager/image-manager.component').then(m => m.ImageManagerComponent)},
    ]
  },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent}

  // { path: 'signup', loadComponent: () => import('./features/signup/signup.component').then(m => m.SignupComponent) }
]