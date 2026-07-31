import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Cuenta } from '../services/cuenta';
import { map, of } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const cuentaservice = inject(Cuenta)
  const router = inject(Router)

  if (cuentaservice.usuarioreciente()) {
    return of(true)
  } else {
    return cuentaservice.GetEstadoAutorizado().pipe(
      map(auth => {
        if (auth.estaAutorizado) {
          return true
        } else {
          router.navigate(['/cuenta/login'], { queryParams: { returnUrl: state.url } })
          return false

        }
      })
    )


  }

};
