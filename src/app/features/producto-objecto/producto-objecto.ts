import { Component, inject, Input, Pipe } from '@angular/core';
import { Producto } from '../../shared/models/producto';
import { MatCard, MatCardContent, MatCardActions } from "@angular/material/card";
import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { Carritoservices } from '../../services/carritoservices';


@Component({
  selector: 'app-producto-objecto',
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatAnchor, MatIcon, RouterLink],
  templateUrl: './producto-objecto.html',
  styleUrl: './producto-objecto.scss',
})
export class ProductoObjecto {
  @Input() producto? : Producto
  carritoService = inject(Carritoservices)
}
