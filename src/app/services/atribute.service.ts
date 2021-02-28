import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AtributeService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: "Bearer " + localStorage.getItem('token')
    })
  };
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44367/api';
  formModel = this.fb.group({
    Naziv: ['', Validators.required],
    FkJedinicaMjereId: [null]
 });

 create() {
  var body = {
    Naziv: this.formModel.value.Naziv,
    FkJedinicaMjereId: this.formModel.value.FkJedinicaMjereId,

  };
  return this.http.post(this.BaseURI + '/Atributi', body, this.httpOptions);
}
getAll() {
 
  return this.http.get(this.BaseURI + '/Atributi/get-all-atributes', this.httpOptions);
}
}
