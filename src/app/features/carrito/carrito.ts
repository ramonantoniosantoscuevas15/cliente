import { Component, inject } from '@angular/core';
import { Carritoservices } from '../../services/carritoservices';
import { CarritoObjeto } from "../carrito-objeto/carrito-objeto";
import { OrdenResumen } from "../../shared/orden-resumen/orden-resumen";
import { EstadoVacio } from "../../shared/estado-vacio/estado-vacio";

@Component({
  selector: 'app-carrito',
  imports: [CarritoObjeto, OrdenResumen, EstadoVacio],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',

})
export class Carrito {
  carritoservice = inject(Carritoservices)



}

