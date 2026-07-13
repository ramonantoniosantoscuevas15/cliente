import { Component, inject } from '@angular/core';
import { Productosservices } from '../../services/productosservices';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContainer, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrosdialog',
  imports: [MatDivider, MatSelectionList, MatListOption,MatButton,FormsModule],
  templateUrl: './filtrosdialog.html',
  styleUrl: './filtrosdialog.scss',
})
export class Filtrosdialog {
    productoservices = inject(Productosservices)
    private dialogRef = inject(MatDialogRef<Filtrosdialog>)
    datos = inject(MAT_DIALOG_DATA)

    marcasSeleccionadas : string[] = this.datos.marcasSeleccionadas
    tiposSeleccionados : string[] = this.datos.tiposSeleccionados
    aplicarfiltro(){
      this.dialogRef.close({
       marcasSeleccionadas : this.marcasSeleccionadas,
        tiposSeleccionados : this.tiposSeleccionados
      })
    }
}
