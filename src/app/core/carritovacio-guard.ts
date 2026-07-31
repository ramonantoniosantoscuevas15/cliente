import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Carritoservices } from '../services/carritoservices';
import { Snackbar } from './snackbar';

export const carritovacioGuard: CanActivateFn = (route, state) => {
  const carritoservice = inject(Carritoservices)
  const router = inject(Router)
  const snack = inject(Snackbar)

  if(!carritoservice.carrito() || carritoservice.carrito()?.objetos.length === 0){
    snack.error('Tu Carrito esta Vacio')
    router.navigateByUrl('/carrito')
    return false

  }
  return true;
};
