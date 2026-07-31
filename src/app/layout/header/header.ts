import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatAnchor } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Ocupado } from '../../core/ocupado';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Carritoservices } from '../../services/carritoservices';
import { Cuenta } from '../../services/cuenta';
import { MatMenuTrigger, MatMenu, MatMenuItem } from "@angular/material/menu";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-header',
  imports: [MatBadge, MatIcon, MatAnchor, RouterLink, RouterLinkActive, MatProgressBar, MatMenuTrigger, MatMenu, MatMenuItem, MatDivider],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  ocupadoService = inject(Ocupado)
  carritoservice = inject(Carritoservices)
  cuentaservice = inject(Cuenta)
  private router = inject(Router)

  logout(){
    this.cuentaservice.logout().subscribe({
      next: () =>{
        this.cuentaservice.usuarioreciente.set(null)
        this.router.navigateByUrl('/')
      }
    })
  }
}
