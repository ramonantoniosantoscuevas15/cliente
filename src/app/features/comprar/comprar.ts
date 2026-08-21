import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdenResumen } from "../../shared/orden-resumen/orden-resumen";
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from "@angular/router";
import { MatAnchor, MatButton } from "@angular/material/button";
import { StripeService } from '../../core/stripeservice';
import { StripeAddressElement } from '@stripe/stripe-js';
import { Snackbar } from '../../core/snackbar';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Address, Direccion } from '../../shared/models/usuario';
import { firstValueFrom } from 'rxjs';
import { Cuenta } from '../../services/cuenta';
import { CompraEntrega } from "./compra-entrega/compra-entrega";

@Component({
  selector: 'app-comprar',
  imports: [OrdenResumen, MatStepperModule, RouterLink, MatAnchor, MatButton, MatCheckboxModule, CompraEntrega],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css',
})
export class Comprar implements OnInit,OnDestroy {

  private stripeservice = inject(StripeService)
  private snackbar = inject(Snackbar)
  private cuentaservice = inject(Cuenta)
  addressElement?: StripeAddressElement
  guradardireccion = false
  async ngOnInit() {
    try {
      this.addressElement = await this.stripeservice.createAddressElement()
      this.addressElement.mount('#direccion-elemento')

    } catch (error:any) {
      this.snackbar.error(error.message)

    }
  }
  ngOnDestroy(): void {
    this.stripeservice.mostrarelementos()
  }
  async onStateChange(event:StepperSelectionEvent){
    if(event.selectedIndex === 1){
      if(this.guradardireccion){
        const direccion = await this.obtenerdirecciondeStripeAddress()
        direccion && firstValueFrom(this.cuentaservice.actualizarDireccion(direccion))


      }
    }
    if(event.selectedIndex === 2){
      await firstValueFrom(this.stripeservice.crearoactualizarPagoIntent())
    }

  }
  private async obtenerdirecciondeStripeAddress():Promise<Address | null> {
    const resultado = await this.addressElement?.getValue()
    const address = resultado?.value.address
    if(address){
      return{
        line1:address.line1,
        line2:address.line2 || undefined,
        city:address.city,
        country:address.country,
        state:address.state,
        postalcode:address.postal_code

      }
    }else return null
  }
  guardardirreccioncheckbox(event:MatCheckboxChange){
    this.guradardireccion = event.checked

  }

}
