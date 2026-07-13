import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Productosservices } from '../../services/productosservices';
import { Producto } from '../../shared/models/producto';
import { MatCard } from '@angular/material/card';
import { ProductoObjecto } from "../producto-objecto/producto-objecto";
import { MatDialog } from '@angular/material/dialog';
import { Filtrosdialog } from '../filtrosdialog/filtrosdialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-tienda',
  imports: [ProductoObjecto,MatIcon],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',

})
export class Tienda implements OnInit {
  ngOnInit(): void {
    this.inicializartienda()

  }


  productos: Producto[] = []
  private dialogservices = inject(MatDialog)
  private productoservices = inject(Productosservices)
  marcasSeleccionadas:string[] = []
  tiposSeleccionados:string[] = []
  inicializartienda(){
    this.productoservices.obtenermarcas()
    this.productoservices.obtenertipos()
    this.productoservices.obtenerproducto().subscribe({
      next: response => this.productos = response.datos,
      error: error => console.log(error)

    })
  }
  AbrirFiltroDialog(){
    const dialogRef = this.dialogservices.open(Filtrosdialog,{
      minWidth:'500px',
      data:{
       marcasSeleccionadas : this.marcasSeleccionadas,
       tiposSeleccionados : this.tiposSeleccionados
      }
    })
    dialogRef.afterClosed().subscribe({
      next:result =>{
        if(result){
           console.log(result)
          this.marcasSeleccionadas = result.marcasSeleccionadas
          this.tiposSeleccionados = result.tiposSeleccionados
          this.productoservices.obtenerproducto(this.marcasSeleccionadas,this.tiposSeleccionados).subscribe({
            next: response=> this.productos = response.datos,
            error:error => console.log(error)
          })
        }
      }
    })
  }
}
