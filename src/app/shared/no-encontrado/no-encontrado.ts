import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-no-encontrado',
  imports: [MatIcon, RouterLink, MatAnchor],
  templateUrl: './no-encontrado.html',
  styleUrl: './no-encontrado.css',
})
export class NoEncontrado {}
