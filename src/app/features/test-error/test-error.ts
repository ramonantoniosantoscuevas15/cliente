import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-test-error',
  imports: [MatAnchor],
  templateUrl: './test-error.html',
  styleUrl: './test-error.css',
})
export class TestError {
  baseurl = 'https://localhost:7136/api/'
  private http = inject(HttpClient)
  validationErrors?: string[]

  obtener404Error(){
    this.http.get(this.baseurl + 'bug/notfound').subscribe({
      next:response => console.log(response),
      error: error => console.log(error)
    })
  }
   obtener400Error(){
    this.http.get(this.baseurl + 'bug/badrequest').subscribe({
      next:response => console.log(response),
      error: error => console.log(error)
    })
  }
   obtener401Error(){
    this.http.get(this.baseurl + 'bug/noautorizado').subscribe({
      next:response => console.log(response),
      error: error => console.log(error)
    })
  }

  obtener500Error(){
    this.http.get(this.baseurl + 'bug/internalerror').subscribe({
      next:response => console.log(response),
      error: error => console.log(error)
    })
  }

   obtener400validationError(){
    this.http.post(this.baseurl + 'bug/validationerror',{}).subscribe({
      next:response => console.log(response),
      error: error => this.validationErrors = error
    })
  }
}
