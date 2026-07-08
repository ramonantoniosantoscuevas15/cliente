import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatBadge, MatIcon, MatAnchor],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
