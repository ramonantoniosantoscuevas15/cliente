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

@Component({
  selector: 'app-producto-detalle',
  imports: [CurrencyPipe, MatAnchor, MatIcon, MatFormField, MatLabel, MatInput, MatDivider],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle implements OnInit {
  ngOnInit(): void {
    this.cargarproducto()
  }
  private productoservices = inject(Productosservices)
  private activatedRoute = inject(ActivatedRoute)
  producto?:Producto

  cargarproducto(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if(!id) return
    this.productoservices.obtenerproducto(+id).subscribe({
      next: producto => this.producto = producto,
      error: error => console.log(error)
    })
  }
}
