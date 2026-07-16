import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Ocupado {
  loading= false;
  ocupadoRequesCount=0
  ocupado(){
    this.ocupadoRequesCount++
    this.loading=true
  }
  idle(){
    this.ocupadoRequesCount--
    if(this.ocupadoRequesCount <=0){
      this.ocupadoRequesCount =0
      this.loading=false
    }
  }
}
