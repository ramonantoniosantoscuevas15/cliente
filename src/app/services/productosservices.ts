import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paginacion } from '../shared/models/paginacion';
import { Producto } from '../shared/models/producto';
import { TienedaParams } from '../shared/models/tiendaParams';

@Injectable({
  providedIn: 'root',
})
export class Productosservices {
  baseurl = 'https://localhost:7136/api/'
  private http = inject(HttpClient)
  tipos: string[] = []
  marcas: string[] = []

  obtenerproductos(tiendaParams: TienedaParams) {
    let params = new HttpParams()
    if (tiendaParams.marcas.length > 0) {
      params = params.append('marcas', tiendaParams.marcas.join(','))
    }
    if (tiendaParams.tipos.length > 0) {
      params = params.append('tipos', tiendaParams.tipos.join(','))
    }
    if (tiendaParams.orden) {
      params = params.append('orden', tiendaParams.orden)
    }
    if(tiendaParams.buscar){
      params = params.append('buscar',tiendaParams.buscar)
    }
    params = params.append('CantidadPagina', tiendaParams.cantidadPagina)
    params = params.append('PaginaIndex', tiendaParams.paginaIndex)
    return this.http.get<Paginacion<Producto>>(this.baseurl + 'productos', { params })
  }
  obtenerproducto(id:number){
    return this.http.get<Producto>(this.baseurl + 'productos/' + id)
  }

  obtenermarcas() {
    if (this.marcas.length > 0) return
    return this.http.get<string[]>(this.baseurl + 'productos/marcas').subscribe({
      next: response => this.marcas = response
    })
  }

  obtenertipos() {
    if (this.tipos.length > 0) return
    return this.http.get<string[]>(this.baseurl + 'productos/tipos').subscribe({
      next: response => this.tipos = response
    })
  }

}
