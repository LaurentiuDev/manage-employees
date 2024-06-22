import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'employees',
    loadComponent: () => import('@manage-employees/feature').then((feature) => feature.EmployeeComponent) 
  }
];
