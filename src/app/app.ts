import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { HttpClient } from '@angular/common/http';
import { Producto } from './shared/models/producto';
import { Paginacion } from './shared/models/paginacion';

@Component({
  selector: 'app-root',
  imports: [ Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    this.http.get<Paginacion<Producto>>(this.baseurl + 'productos').subscribe({
      next:response => this.productos = response.datos,
      error:error => console.log(error),
      complete: ()=> console.log('complete')
    })
  }
  baseurl = 'https://localhost:7136/api/'
  private http = inject(HttpClient)
   title = 'Skinet';
   productos: Producto []=[]
}
