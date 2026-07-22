import { Component, inject, OnInit } from '@angular/core';
import { Productosservices } from '../../services/productosservices';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../shared/models/producto';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatInput } from '@angular/material/input';
import { MatDivider } from "@angular/material/divider";
import { Carritoservices } from '../../services/carritoservices';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-detalle',
  imports: [CurrencyPipe, MatAnchor, MatIcon, MatFormField, MatLabel, MatInput, MatDivider,FormsModule],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle implements OnInit {
  ngOnInit(): void {
    this.cargarproducto()
  }
  private productoservices = inject(Productosservices)
  private activatedRoute = inject(ActivatedRoute)
  private carritoservice = inject(Carritoservices)
  producto?:Producto
  cantidadCarrito=0
  cantidad = 1

  cargarproducto(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if(!id) return
    this.productoservices.obtenerproducto(+id).subscribe({
      next: producto => {
        this.producto = producto
        this.actualizarcantidaenCarrito()
      },
      error: error => console.log(error)
    })
  }

  actualizarCarrito(){
    if(!this.producto) return
    if(this.cantidad > this.cantidadCarrito){
      const objetosaAgregar = this.cantidad - this.cantidadCarrito
      this.cantidadCarrito += objetosaAgregar
      this.carritoservice.agregarobjetoalCarrito(this.producto,objetosaAgregar)
    }else{
      const objetosaremover = this.cantidadCarrito - this.cantidad
      this.cantidadCarrito -= objetosaremover
      this.carritoservice.removerobjetodelCarrito(this.producto.id,objetosaremover)
    }
  }

  actualizarcantidaenCarrito(){
    this.cantidadCarrito =  this.carritoservice.carrito()?.
    objetos.find(c => c.productoid === this.producto?.id)?.cantidad || 0
    this.cantidad = this.cantidadCarrito || 1

  }

  obtenerbuttontext(){
    return this.cantidadCarrito > 0 ? 'actualizar carrito' : 'agregar al carrito'
  }
}
