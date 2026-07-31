import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Direccion, usuario } from '../shared/models/usuario';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cuenta {
  baseurl = environment.apiUrl
  private http = inject(HttpClient)
  usuarioreciente = signal<usuario | null>(null)

  login(values:any){
    let params = new HttpParams()
    params = params.append('useCookies',true)
    return this.http.post<usuario>(this.baseurl + 'login', values,{params})
  }

  registro(values:any){
    return this.http.post(this.baseurl + 'cuenta/registro', values)
  }

  obtenerUsuarioInfo(){
    return this.http.get<usuario>(this.baseurl + 'cuenta/usuario-info').pipe(
      map(usuario => {
        this.usuarioreciente.set(usuario)
        return usuario
      })
    )
  }

  //  por si tienes algun problema con las credenciales usa {withCredentials: true} en cada funcion ejemplo
  //logout(){
   // return this.http.post(this.baseurl + 'cuenta/logout',{},{withCredentials: true})
 // }

  logout(){
    return this.http.post(this.baseurl + 'cuenta/logout',{})
  }

  actualizarDireccion(direccion:Direccion){
    return this.http.post(this.baseurl + 'cuenta/direccion', direccion)
  }

  GetEstadoAutorizado(){
    return this.http.get<{estaAutorizado:boolean}>(this.baseurl + 'cuenta/auth-status')
  }
}
