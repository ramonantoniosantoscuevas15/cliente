import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { Cuenta } from '../../services/cuenta';
import { Router, ActivatedRoute } from '@angular/router';
import { FormUtilidades } from '../../utils/form-utilidades';
import { MatInput } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-cuenta-login',
  imports: [ReactiveFormsModule, MatCard, MatFormField, MatLabel, MatInput, MatAnchor, MatError],
  templateUrl: './cuenta-login.html',
  styleUrl: './cuenta-login.css',
})
export class CuentaLogin {
  private fb = inject(FormBuilder)
  private cuentaservice = inject(Cuenta)
  private router = inject(Router)
  formUtilidades = FormUtilidades
  private activatedRoute = inject(ActivatedRoute)
  returnUrl='/tienda'
  constructor(){
    const url = this.activatedRoute.snapshot.queryParams['returnUrl']
    if(url) this.returnUrl = url
  }

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.pattern(this.formUtilidades.emailPattern)]],
    password:['',{ validators: [Validators.required, Validators.minLength(8)] }]
  })

  onSubmit(){
    this.cuentaservice.login(this.loginForm.value).subscribe({
      next: () =>{
        this.cuentaservice.obtenerUsuarioInfo().subscribe()
        this.router.navigateByUrl(this.returnUrl)
      }
    })
  }
}
