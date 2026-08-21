import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { Carritoservices } from '../../services/carritoservices';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-orden-resumen',
  imports: [RouterLink, MatAnchor, MatFormField, MatLabel, MatInput,CurrencyPipe],
  templateUrl: './orden-resumen.html',
  styleUrl: './orden-resumen.css',
})
export class OrdenResumen {
  carritoservice = inject(Carritoservices)
  location = inject(Location)

}
