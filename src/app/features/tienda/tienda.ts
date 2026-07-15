import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Productosservices } from '../../services/productosservices';
import { Producto } from '../../shared/models/producto';
import { MatCard } from '@angular/material/card';
import { ProductoObjecto } from "../producto-objecto/producto-objecto";
import { MatDialog } from '@angular/material/dialog';
import { Filtrosdialog } from '../filtrosdialog/filtrosdialog';
import { MatButton, MatIconButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { TienedaParams } from '../../shared/models/tiendaParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Paginacion } from '../../shared/models/paginacion';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tienda',
  imports: [ProductoObjecto, MatIcon, MatMenu, MatSelectionList, MatListOption, MatMenuTrigger, MatPaginator, FormsModule, MatIconButton, MatAnchor],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',

})
export class Tienda implements OnInit {
  ngOnInit(): void {
    this.inicializartienda()

  }


  productos?: Paginacion<Producto>
  private dialogservices = inject(MatDialog)
  private productoservices = inject(Productosservices)

  ordenOpciones = [
    {nombre:'Alphabetico',valor: 'nombre'},
    {nombre:'Precio: Menor-Mayor', valor:'precioAsc'},
    {nombre:'Precio: Mayor-Menor', valor:'precioDesc'}
  ]
  tiendaparams = new TienedaParams()
  pagesizeoptions = [5,10,15,20]
  inicializartienda(){
    this.productoservices.obtenermarcas()
    this.productoservices.obtenertipos()
    this.ObtenerProductos()

  }
  ObtenerProductos(){
    this.productoservices.obtenerproductos(this.tiendaparams).subscribe({
      next: response => this.productos = response,
      error: error => console.log(error)

    })

  }
  ordenChange(event: MatSelectionListChange){
    const opcionesseleccionadas = event.options[0]
    if(opcionesseleccionadas){
      this.tiendaparams.orden = opcionesseleccionadas.value
      this.tiendaparams.paginaIndex = 1
      this.ObtenerProductos()
    }

  }
  buscarChange(){
    this.tiendaparams.paginaIndex = 1
    this.ObtenerProductos()
  }
  AbrirFiltroDialog(){
    const dialogRef = this.dialogservices.open(Filtrosdialog,{
      minWidth:'500px',
      data:{
       marcasSeleccionadas : this.tiendaparams.marcas,
       tiposSeleccionados : this.tiendaparams.tipos
      }
    })
    dialogRef.afterClosed().subscribe({
      next:result =>{
        if(result){

          this.tiendaparams.marcas = result.marcasSeleccionadas
          this.tiendaparams.tipos = result.tiposSeleccionados
          this.tiendaparams.paginaIndex = 1
          this.ObtenerProductos()
        }
      }
    })

  }
  manejarPageEvent(event:PageEvent){
    this.tiendaparams.paginaIndex = event.pageIndex + 1
    this.tiendaparams.cantidadPagina = event.pageSize

    this.ObtenerProductos()
  }
}
