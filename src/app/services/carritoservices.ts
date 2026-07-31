import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Carrito, Carritoobjeto } from '../shared/models/carrito';
import { Producto } from '../shared/models/producto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Carritoservices {
  baseurl = environment.apiUrl
  private http = inject(HttpClient)
  carrito = signal<Carrito | null> (null)
  objetototal = computed(()=>{
    return this.carrito()?.objetos.reduce((suma,objeto)=> suma + objeto.cantidad,0)
  })
  totales = computed(() =>{
    const carrito = this.carrito()
    if(!carrito) return null
    const subtotal = carrito.objetos.reduce((suma,objeto)=> suma + objeto.precio * objeto.cantidad,0)
    const envio = 0
    const descuento =0
    return{
      subtotal,
      envio,
      descuento,
      total: subtotal + envio - descuento
    }
  })

  obtenerCarrito(id:string){
    return this.http.get<Carrito>(this.baseurl + 'carrito?id=' + id).pipe(
      map(carrito =>{
        this.carrito.set(carrito)
        return carrito
      })
    )
  }

  SetCarrito(carrito:Carrito){
    return this.http.post<Carrito>(this.baseurl + 'carrito',carrito).subscribe({
      next:carrito=> this.carrito.set(carrito)

    })
  }

  async agregarobjetoalCarrito(objeto:Carritoobjeto | Producto,cantidad = 1){
    const carrito = this.carrito() ?? this.crearCarrito()
    if(this.esProducto(objeto)){
      objeto = this.mapProductoaCarritoobjeto(objeto)
    }
    carrito.objetos = this.agregaroActualizarobjeto(carrito.objetos,objeto,cantidad)
    this.SetCarrito(carrito)
  }

  async removerobjetodelCarrito(productoid:number,cantidad=1){
    const carrito = this.carrito()
    if(!carrito) return
    const index = carrito.objetos.findIndex(c => c.productoid === productoid)
    if(index !==-1){
      if(carrito.objetos[index].cantidad > cantidad){
        carrito.objetos[index].cantidad -= cantidad
      }else{
        carrito.objetos.splice(index,1)
      }
      if(carrito.objetos.length === 0){
        this.removercarrito()
      }else{
        this.SetCarrito(carrito)
      }
    }
  }
  removercarrito() {
    this.http.delete(this.baseurl + 'carrito?id=' + this.carrito()?.id).subscribe({
      next:() => {
        localStorage.removeItem('carrito_id')
        this.carrito.set(null)

      }
    })
  }
  private agregaroActualizarobjeto(objetos: Carritoobjeto[], objeto: Carritoobjeto, cantidad: number): Carritoobjeto[] {
    const index = objetos.findIndex(o => o.productoid === objeto.productoid)
    if(index === -1){
      objeto.cantidad = cantidad
      objetos.push(objeto)
    }else{
      objetos[index].cantidad += cantidad
    }
    return objetos
  }
  private mapProductoaCarritoobjeto(objeto: Producto): Carritoobjeto  {
    return{
      productoid: objeto.id,
      productonombre:objeto.nombre,
      precio:objeto.precio,
      cantidad:0,
      foto:objeto.foto,
      marca:objeto.marca,
      tipo:objeto.tipo,

    }
  }
  private esProducto(objeto:Carritoobjeto | Producto): objeto is Producto{
    return (objeto as Producto).id!== undefined
  }
  private crearCarrito(): Carrito{
  const carrito = new Carrito()
  localStorage.setItem('carrito_id', carrito.id)
  return carrito
}
}


