import { FormGroup, ValidationErrors, FormArray } from "@angular/forms";

export class FormUtilidades {
  //expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isvalidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    )

  }
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este Campo es Requerido'
        case 'minlength':
          return `Este Campo Requiere un Minimo de ${errors['minlength'].requiredLength} Caracteres`
        case 'min':
          return `Este Campo Requiere un Minimo de ${errors['min'].min} Caracteres`
        case 'email':
          return `El valor ingresado no es un correo electronico valido`
        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtilidades.emailPattern) {
            return 'El Correo Electronico no es valido'

          }

          return 'Error de Patron contra expresion regular'
        case 'maxLength':
          return `Este Campo Requiere un Maximo de ${errors['maxLength'].requiredLength} Caracteres`
          case 'max':
            return `Este Campo Requiere un Maximo de ${errors['max'].max} Caracteres`



        default:
          return 'Error de Validacion no controlado'
      }
    }
    return null

  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null

    const errors = form.controls[fieldName].errors ?? {}

    return FormUtilidades.getTextError(errors)
  }
  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )

  }
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length == 0) return null

    const errors = formArray.controls[index].errors ?? {}

    return FormUtilidades.getTextError(errors)
  }

}
