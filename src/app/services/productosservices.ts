import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paginacion } from '../shared/models/paginacion';
import { Producto } from '../shared/models/producto';

@Injectable({
  providedIn: 'root',
})
export class Productosservices {
  baseurl = 'https://localhost:7136/api/'
  private http = inject(HttpClient)
  tipos:string[]=[]
  marcas:string[]=[]

  obtenerproducto(marcas?:string[],tipos?:string[]){
    let params = new HttpParams()
    if(marcas && marcas.length > 0){
      params = params.append('marcas',marcas.join(','))
    }
    if(tipos && tipos.length > 0){
      params = params.append('tipos',tipos.join(','))
    }
    params = params.append('CantidadPagina',20)
     return this.http.get<Paginacion<Producto>>(this.baseurl + 'productos', {params})
  }

  obtenermarcas(){
    if(this.marcas.length>0) return
    return this.http.get<string[]>(this.baseurl + 'productos/marcas').subscribe({
      next:response => this.marcas = response
    })
  }

  obtenertipos(){
    if(this.tipos.length>0) return
    return this.http.get<string[]>(this.baseurl + 'productos/tipos').subscribe({
      next:response => this.tipos = response
    })
  }

}
