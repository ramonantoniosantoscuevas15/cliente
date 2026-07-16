import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private snackbar = inject(MatSnackBar)

  error(mensaje:string){
    this.snackbar.open(mensaje,'Close',{
      duration:5000,
      panelClass:['snack-error']
    })
  }

  success(mensaje:string){
    this.snackbar.open(mensaje,'Close',{
      duration:5000,
      panelClass:['snack-success']
    })
  }
}
