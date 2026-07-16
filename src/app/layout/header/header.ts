import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Ocupado } from '../../core/ocupado';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  imports: [MatBadge, MatIcon, MatAnchor, RouterLink, RouterLinkActive, MatProgressBar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  ocupadoService = inject(Ocupado)
}
