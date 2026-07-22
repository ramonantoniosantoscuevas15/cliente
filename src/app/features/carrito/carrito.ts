import { Component, inject } from '@angular/core';
import { Carritoservices } from '../../services/carritoservices';
import { CarritoObjeto } from "../carrito-objeto/carrito-objeto";
import { OrdenResumen } from "../../shared/orden-resumen/orden-resumen";

@Component({
  selector: 'app-carrito',
  imports: [CarritoObjeto, OrdenResumen],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',

})
export class Carrito {
  carritoservice = inject(Carritoservices)



}

