
import {Component, ViewChild,OnInit,ViewChildren, QueryList ,ElementRef} from '@angular/core';
import { MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";


import { ArtikliService } from './../services/artikli.service';
import { FormArtikliComponent } from './form-artikli/form-artikli.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AtributeService } from './../services/atribute.service';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationDialogComponent} from './../help/confirmation-dialog/confirmation-dialog.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-artikli',
  templateUrl: './artikli.component.html',
  styles: ['./artikli.component.scss'
  ]
})
export class ArtikliComponent implements OnInit {
 
  displayedColumns = ['Šifra', 'Naziv'];
  atributs: any[]=[];
 totalPages: number=0;
 pageNum: number=1;
 array: any[]=[];
 reset: boolean=false;
 artikli: any[]=[];
dataSource = new MatTableDataSource();
@ViewChildren("dynamicInput") dynamicInputs: QueryList<ElementRef>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort, {}) sort: MatSort;
  constructor(  private toastr: ToastrService,private dialog: MatDialog, public service: ArtikliService,  private serviceAtribut:AtributeService) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get returnValue() {
    if(this.reset){
      return  '';
    }
    
 }
  ngOnInit(): void {
    this.search(1);
    this.serviceAtribut.getAll().subscribe(
      (res: any) => {
        if (res.success) {
       this.atributs=res.list;

       res.list.forEach(atribut => {
       
         this.displayedColumns.push(atribut.naziv);
       });
       this.displayedColumns.push( 'update');
       this.displayedColumns.push('delete');
  
        }
      },
      (error: any) => {                           
       
      }
    );
  
  }
  search(pageNum: number){
    this.service.search(this.array,pageNum).subscribe(
      (res: any) => {
      let data=[];
      res.artikli.forEach((artikal)=>{
        var obj :any = {'pkArtikliId':artikal.pkArtikliId, 'Šifra':artikal.sifra,'Naziv':artikal.naziv}
        artikal.atributiArtikla.forEach((atributArtikla)=>{
          const atrNaziv=atributArtikla.naziv;
          const atrvalue=atributArtikla.value;
          obj[atrNaziv]=atrvalue; 
        }) 
        data.push(obj)
      })
    

       this.dataSource = new MatTableDataSource(data);
       this.pageNum=res.pagNum;
       this.totalPages=res.totalPages;
      },
      (error: any) => {                           
       
      }
    );
  }
  onNavigate(productCode){
    console.log(`product code ${productCode}`)
    }
  openDialog(data:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.position = {
    top: '0',
    left: '0'
};

let dialogRef =  this.dialog.open(FormArtikliComponent, dialogConfig);
dialogRef.afterClosed().subscribe(result => {
this.search(1);
});

}
redirectToUpdate(id: string){

  this.service.getById(id).subscribe(
    (res: any) => {


    if(res.response.success){
     const model=res.response.model;
      this.service.setFormModel(model.naziv, model.sifra, model.fkJedinicaMjereId);

    }
    this.openDialog(res.response.model);
    },
    (error: any) => {                           
     
    }
  );

}
public redirectToDelete = (id: string) => {

  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    data:{
      message: 'Da li želite da obrišete artikal?',
      buttonText: {
        ok: 'Da',
        cancel: 'Ne'
      }
    }
  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
     this.service.delete(id).subscribe(
    (res: any) => {
    if(res.response.success){
   
      this.toastr.success('Artikal je uspješno obrisan!', 'Uspješno brisanje artikla!.');
      this.search(1);
    }
    },
    (error: any) => {                           
      this.toastr.success('Artikal nije obrisan!', 'Neuspješno brisanje artikla!.');
    }
  );
    
    }
  });
  
}
getNext($event){
  this.search($event.pageIndex +1);
}
searchByQuery(){
  this.search(1);
 
}

resetSearch(){
  this.service.formSearchModel.reset();
this.array=[];
var inputs = document.getElementsByTagName('input');
for (let index = 0; index < inputs.length; ++index) {
inputs[index].value="";
}
this.search(1);
}
async onChangeEventInputs(event: any, atribut: any){ var model= {
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
