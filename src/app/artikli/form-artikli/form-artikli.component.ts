import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ArtikliService } from './../../services/artikli.service';
import { ToastrService } from 'ngx-toastr';
import { AtributeService } from './../../services/atribute.service';
import { Output, EventEmitter } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-artikli',
  templateUrl: './form-artikli.component.html',
  styles: [
  ]
})
export class FormArtikliComponent implements OnInit {
  form: FormGroup;
  description:string;
  atributs: any[]=[];
  array: any[]=[];
  @Output() refresh = new EventEmitter<string>();
  constructor(   
    private toastr: ToastrService,
    public service:ArtikliService,
    private serviceAtribut:AtributeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormArtikliComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }
    
  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []]
  });
  this.serviceAtribut.getAll().subscribe(
    (res: any) => {
      if (res.success) {
        this.atributs=res.list;
        if(this.data &&this.data.pkArtikliId){
       this.atributs =  this.atributs.map(item => {
         var atr= _.filter(this.data.atributiArtikla, function(a:any) {
           return a.pkAtributId==item.pkAtributId;
          });
          const obj = {
            pkAtributId: item.pkAtributId,
            naziv: item.naziv,
            value: atr[0]? atr[0].value:''
          };
          return obj;
        }); 
      }
    }
    },
    (error: any) => {                           
     
    }
  );
  }
  ngAfterViewInit(): void{
    if(this.data && this.data.pkArtikliId){
       setTimeout(()=>{      
        const inputsHtmlCol =document.getElementsByTagName('input');
        const inputs= _.filter(inputsHtmlCol, function(a:any) {
        
         return a.getAttribute("dynamic")!=null;
       });
        for (let index = 0; index < inputs.length; ++index) {
          inputs[index].value=this.atributs[index].value;
          const model= {
            pkFkAtributId:this.atributs[index].pkAtributId ,
            value: this.atributs[index].value
          };
          this.array.push(model);
        }
        }, 200);
     }
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
  this.dialogRef.close();
}

onSubmit() {
  if(this.data &&this.data.pkArtikliId){
    this.service.update(this.array,this.data.pkArtikliId).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.formModel.reset();
          this.toastr.success('Artikal je uspješno izmijenjen!', 'Uspješna izmjena artikla!.');
          this.save();
          this.refresh.emit();
        }
      },
      (error: any) => {                           
        this.toastr.error(error.error.message, 'Izmjena nije uspjela.');
      }
    );
  }
else{
  this.service.create(this.array).subscribe(
    (res: any) => {
      if (res.success) {
        this.service.formModel.reset();
        this.toastr.success('Novi artikal je kreiran!', 'Uspješno kreiranje artikla!.');
        this.save();
      }
    },
    (error: any) => {                           
      this.toastr.error(error.error.message, 'Kreiranje nije uspjelo.');
    }
  );
}

}


changeUnit($event){

  

}
async onChangeEvent(event: any, atribut: any){
 var model= {
   pkFkAtributId:atribut.pkAtributId ,
   value: event.target.value
 };

if(event){

 
  if(!event.target.value){
   
    this.array= await  _.filter(this.array, function(a:any) {
      return a.pkFkAtributId !=atribut.pkAtributId;
    });
    return;
  }
 var item= await _.find(this.array, function(a: any) { return a.pkFkAtributId==atribut.pkAtributId; });
 if(!item){
   this.array.push(model);
   return;
}
if(event.target.value){
  item.value=event.target.value;
}


}
}
}
