import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ArtikliService {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: "Bearer " + localStorage.getItem('token')
    })
  };
  pageSize: Number=5;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44367/api';
  formModel = this.fb.group({
    Naziv: ['', Validators.required],
    Sifra: ['', Validators.required],
    FkJedinicaMjereId: [null]
 });
  formSearchModel = this.fb.group({
    Naziv: [''],
    Sifra: [''],
    AtributiArtiklaViewModelList: this.fb.array([])
 });

 create(array: any) {
  var body = {
    Naziv: this.formModel.value.Naziv,
    Sifra: this.formModel.value.Sifra,
    FkJedinicaMjereId: this.formModel.value.FkJedinicaMjereId,
    AtributiArtiklaViewModelList: array
  };
  return this.http.post(this.BaseURI + '/Artikli', body, this.httpOptions);
}
update(array: any, id: string) {
  var body = {
    PkArtikliId: id,
    Naziv: this.formModel.value.Naziv,
    Sifra: this.formModel.value.Sifra,
    FkJedinicaMjereId: this.formModel.value.FkJedinicaMjereId,
    AtributiArtiklaViewModelList: array
  };
  return this.http.put(this.BaseURI + '/Artikli', body, this.httpOptions);
}
getAll() {
  return this.http.get(this.BaseURI + '/Artikli/get-all-artikli', this.httpOptions);
}
getById(id:string){
  return this.http.get(this.BaseURI + '/Artikli/'+id, this.httpOptions);
}
delete(id:string){
  return this.http.delete(this.BaseURI + '/Artikli/'+id, this.httpOptions);
}
setFormModel(name: string, sifra: string, fkJedinicaMjere: number){
  
  this.formModel = this.fb.group({
    Naziv: [name, Validators.required],
    Sifra: [sifra, Validators.required],
    FkJedinicaMjereId: [fkJedinicaMjere]
 });
}
search(body: any,pageNum: number) {
  var searchData = {
    Naziv: this.formSearchModel.value.Naziv,
    Sifra: this.formSearchModel.value.Sifra,
    AtributiArtiklaViewModelList: body,
    PageNum: pageNum,
    PageSize: this.pageSize
  };
  return this.http.post(this.BaseURI + '/Artikli/search', searchData, this.httpOptions);
}
}
