import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Tienda } from './features/tienda/tienda';
import { ProductoDetalle } from './features/producto-detalle/producto-detalle';
import { TestError } from './features/test-error/test-error';
import { NoEncontrado } from './shared/no-encontrado/no-encontrado';

export const routes: Routes = [
  {path:'',component:Home},
  {path:'tienda',component:Tienda},
  {path:'tienda/:id',component:ProductoDetalle},
  {path:'error',component:TestError},
  {path:'noencontrado',component:NoEncontrado},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
