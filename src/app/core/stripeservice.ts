import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeAddressElement, StripeAddressElementOptions, StripeElement, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Carritoservices } from '../services/carritoservices';
import { Carrito } from '../shared/models/carrito';
import { firstValueFrom, map } from 'rxjs';
import { Cuenta } from '../services/cuenta';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  baseUrl = environment.apiUrl
  private carritoService = inject(Carritoservices)
  private cuentaservice = inject(Cuenta)
  private http = inject(HttpClient)
  private stripePromise: Promise<Stripe | null>
  private elementos?: StripeElements
  private direccionelemento?: StripeAddressElement
  private addressElement?: StripeAddressElement
  constructor() {
    this.stripePromise = loadStripe(environment.stripePublicKey)
  }

  getStripeInstance() {
    return this.stripePromise
  }

  async inicializaeElementos() {
    if (!this.elementos) {
      const stripe = await this.getStripeInstance()
      if (stripe) {
        const carrito = await firstValueFrom(this.CrearoActualizarPagoIntento())
        this.elementos = stripe.elements({ clientSecret: carrito.clientsecret, appearance: { labels: 'floating' } })
      } else {
        throw new Error('Stripe no a Cargado')
      }

    }
    return this.elementos
  }

  async crearDireccionElemento() {

    // if (!this.direccionelemento) {
    //   const elementos = await this.inicializaeElementos()
    //   if (elementos) {
    //     const usuario = this.cuentaservice.usuarioreciente()
    //     let defaultValues: StripeAddressElementOptions['defaultValues'] = {}
    //     if (usuario) {
    //       defaultValues.name = usuario.nombre + ' ' + usuario.apellido
    //     }
    //     if (usuario?.direccion) {
    //       defaultValues.address = {
    //         line1: usuario.direccion.linea1,
    //         line2: usuario.direccion.linea2,
    //         city: usuario.direccion.ciudad,

    //         state: usuario.direccion.provincia,

    //         postal_code: usuario.direccion.codigopostal,

    //         country: usuario.direccion.pais,



    //       }
    //     }

    //     const opciones: StripeAddressElementOptions = {
    //       mode: 'shipping',
    //       defaultValues
    //     }
    //     this.direccionelemento = elementos.create('address', opciones)
    //   } else {
    //     throw new Error('las Instancias de elemento no han cargado')
    //   }
    // }
    // return this.direccionelemento

  }

  async createAddressElement() {
    if (!this.addressElement) {
      const elements = await this.inicializaeElementos()
      if (elements) {
        const usuario = this.cuentaservice.usuarioreciente()
        let defaultValues: StripeAddressElementOptions['defaultValues'] = {}
        if (usuario) {
         defaultValues.name = usuario.nombre + ' ' + usuario.apellido
       }
       if(usuario?.address){
        defaultValues.address = {
          line1:usuario.address.line1,
          line2:usuario.address.line2,
          city:usuario.address.city,
          state:usuario.address.state,
          country:usuario.address.country,
          postal_code:usuario.address.postalcode
        }
       }
        const options : StripeAddressElementOptions ={
          mode:'shipping',defaultValues
        }
        this.addressElement = elements.create('address',options)


      }else{
        throw new Error('las Instancias de elemento no han cargado')
      }




    }
    return this.addressElement

  }

  crearoactualizarPagoIntent() {
    const carrito = this.carritoService.carrito()
    if (!carrito) throw new Error('Problema con el Carrito')
    return this.http.post<Carrito>(this.baseUrl + 'Pago/' + carrito.id, {}).pipe(
      map(carrito => {
        this.carritoService.carrito.set(carrito)
        return carrito

      })
    )

  }
  CrearoActualizarPagoIntento() {
    const carrito = this.carritoService.carrito()
    if (!carrito) throw new Error('Problema con el Carrito')
    return this.http.post<Carrito>(this.baseUrl + 'Pago/' + carrito.id, {}).pipe(
      map(carrito => {
        this.carritoService.SetCarrito(carrito)
        return carrito

      })
    )
  }
  mostrarelementos() {
    this.elementos = undefined
    this.direccionelemento = undefined
  }
}
