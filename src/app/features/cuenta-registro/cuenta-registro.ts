import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cuenta } from '../../services/cuenta';
import { Router } from '@angular/router';
import { Snackbar } from '../../core/snackbar';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/select";
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormUtilidades } from '../../utils/form-utilidades';
import { TextInput } from "../../shared/text-input/text-input";

@Component({
  selector: 'app-cuenta-registro',
  imports: [ReactiveFormsModule, MatCard, MatFormField, MatLabel, MatInput, MatButton, MatError, ],
  templateUrl: './cuenta-registro.html',
  styleUrl: './cuenta-registro.css',
})
export class CuentaRegistro {
  private fb = inject(FormBuilder)
  private cuentaservices = inject(Cuenta)
  private router = inject(Router)
  private snack = inject(Snackbar)
  validacionErrors?:string[]
  formUtilidades = FormUtilidades

  registroForm = this.fb.group({
    nombre:['',{ validators: [Validators.required, Validators.minLength(3)] }],
    apellido:['',{ validators: [Validators.required, Validators.minLength(3)] }],
    email:['',[Validators.required,Validators.pattern(this.formUtilidades.emailPattern)]],
    password:['',{ validators: [Validators.required, Validators.minLength(8)] }]
  })

  onSubmit(){
    this.cuentaservices.registro(this.registroForm.value).subscribe({
      next:() =>{
        this.snack.success('Registro realizado Exitosamente')
        this.router.navigateByUrl('/cuenta/login')
      },
      error: errors => this.validacionErrors = errors

    })
  }
}
