import { Component, inject, OnInit } from '@angular/core';
import { Comprarservices } from '../../../services/comprarservices';
import { MatRadioModule, MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { CurrencyPipe } from '@angular/common';
import { Carritoservices } from '../../../services/carritoservices';
import { Metodoentrega } from '../../../shared/models/metodoentrega';

@Component({
  selector: 'app-compra-entrega',
  imports: [MatRadioButton, MatRadioGroup,CurrencyPipe],
  templateUrl: './compra-entrega.html',
  styleUrl: './compra-entrega.css',
})
export class CompraEntrega implements OnInit {
  compraservices = inject(Comprarservices)
  carritoservice = inject(Carritoservices)
  ngOnInit(): void {
    this.compraservices.getMetodoentrega().subscribe({
      next: metodos =>{
        if(this.carritoservice.carrito()?.metodoentregaid){
          const metodo = metodos.find(x => x.id === this.carritoservice.carrito()?.metodoentregaid)
          if(metodo){
            this.carritoservice.entregaseleccionada.set(metodo)
          }
        }
      }
    })
  }

  ActualizarMetodoEntrega(metodo:Metodoentrega){
    this.carritoservice.entregaseleccionada.set(metodo)
    const carrito = this.carritoservice.carrito()
    if(carrito){
      carrito.metodoentregaid = metodo.id
      this.carritoservice.SetCarrito(carrito)
    }

  }

}
