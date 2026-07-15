import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Tienda } from './features/tienda/tienda';
import { ProductoDetalle } from './features/producto-detalle/producto-detalle';

export const routes: Routes = [
  {path:'',component:Home},
  {path:'tienda',component:Tienda},
  {path:'tienda/:id',component:ProductoDetalle},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
