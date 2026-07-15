import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { HttpClient } from '@angular/common/http';
import { Producto } from './shared/models/producto';
import { Paginacion } from './shared/models/paginacion';
import { Productosservices } from './services/productosservices';
import { Tienda } from "./features/tienda/tienda";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  title = 'Skinet';
}
