import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-estado-vacio',
  imports: [MatIcon, MatAnchor, RouterLink],
  templateUrl: './estado-vacio.html',
  styleUrl: './estado-vacio.css',
})
export class EstadoVacio {}
