import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Tienda } from './features/tienda/tienda';
import { ProductoDetalle } from './features/producto-detalle/producto-detalle';
import { TestError } from './features/test-error/test-error';
import { NoEncontrado } from './shared/no-encontrado/no-encontrado';
import { Carrito } from './features/carrito/carrito';
import { Comprar } from './features/comprar/comprar';
import { CuentaLogin } from './features/cuenta-login/cuenta-login';
import { CuentaRegistro } from './features/cuenta-registro/cuenta-registro';
import { authGuardGuard } from './core/auth-guard-guard';
import { carritovacioGuard } from './core/carritovacio-guard';

export const routes: Routes = [
  {path:'',component:Home},
  {path:'tienda',component:Tienda},
  {path:'tienda/:id',component:ProductoDetalle},
  {path:'carrito',component:Carrito},
  {path:'compra',component:Comprar, canActivate: [authGuardGuard,carritovacioGuard]},
  {path:'cuenta/login',component:CuentaLogin},
  {path:'cuenta/registro',component:CuentaRegistro},
  {path:'error',component:TestError},
  {path:'noencontrado',component:NoEncontrado},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
