import { Component, inject, input } from '@angular/core';
import { Carritoobjeto } from '../../shared/models/carrito';
import { RouterLink } from "@angular/router";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';
import { Carritoservices } from '../../services/carritoservices';

@Component({
  selector: 'app-carrito-objeto',
  imports: [RouterLink, MatIconButton, MatIcon, CurrencyPipe,],
  templateUrl: './carrito-objeto.html',
  styleUrl: './carrito-objeto.css',
})
export class CarritoObjeto {
  objeto = input.required<Carritoobjeto>()
  carritoservice = inject(Carritoservices)

  incrementarCatidad(){
    this.carritoservice.agregarobjetoalCarrito(this.objeto())
  }

  decrementarCantidad(){
    this.carritoservice.removerobjetodelCarrito(this.objeto().productoid)
  }

  quitarobjetodelCarrito(){
    this.carritoservice.removerobjetodelCarrito(this.objeto().productoid, this.objeto().cantidad)
  }
}
