import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { Ocupado } from './ocupado';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ocupado = inject(Ocupado)
  ocupado.ocupado()
  return next(req).pipe(
    delay(500),
    finalize(()=>ocupado.idle())
  )
};
