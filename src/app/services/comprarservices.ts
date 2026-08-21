import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Metodoentrega } from '../shared/models/metodoentrega';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Comprarservices {
  baseUrl = environment.apiUrl
  private http = inject(HttpClient)
  metodoentregas: Metodoentrega[] = []

   getMetodoentrega() {
    if (this.metodoentregas.length > 0) return of(this.metodoentregas)
    return this.http.get<Metodoentrega[]>(this.baseUrl + 'pago/metodo-entrega').pipe(
  map(metodos =>{
     this.metodoentregas = metodos.sort((a,b) => a.precio-b.precio)
    return metodos

 })

     )
   }
}
