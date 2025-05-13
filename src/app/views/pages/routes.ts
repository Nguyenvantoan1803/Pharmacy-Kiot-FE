import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  // {
  //   path: 'user',
  //   loadComponent: () => import('../../../components/standard/standard-infomation/standard-user/standard-user.component').then(m => m.StandardUserComponent),
  //   data: {
  //     title: 'Register Page'
  //   }
  // }
];
