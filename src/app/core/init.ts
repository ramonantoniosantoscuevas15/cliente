import { inject, Injectable } from '@angular/core';
import { Carritoservices } from '../services/carritoservices';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Init {
  private carritoServicio = inject(Carritoservices)

  inint(){
    const carritoid = localStorage.getItem('carrito_id')
    const carrito$ = carritoid ? this.carritoServicio.obtenerCarrito(carritoid) : of(null)
    return carrito$
  }
}
