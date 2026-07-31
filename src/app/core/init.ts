import { inject, Injectable } from '@angular/core';
import { Carritoservices } from '../services/carritoservices';
import { forkJoin, of } from 'rxjs';
import { Cuenta } from '../services/cuenta';
import { usuario } from '../shared/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class Init {
  private carritoServicio = inject(Carritoservices)
  private cuentaservice = inject(Cuenta)

  inint(){
    const carritoid = localStorage.getItem('carrito_id')
    const carrito$ = carritoid ? this.carritoServicio.obtenerCarrito(carritoid) : of(null)
    return forkJoin({
      carrito : carrito$,
      usuario : this.cuentaservice.obtenerUsuarioInfo()
    })
  }
}
