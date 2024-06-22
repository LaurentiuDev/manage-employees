import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'employees',
    loadComponent: () => import('@manage-employees/employee/feature')
      .then((feature) => feature.EmployeeContainerComponent) 
  }
];
