import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { FormAtributeComponent } from './form-atribute/form-atribute.component';
import { AtributeService } from './../services/atribute.service';

@Component({
  selector: 'app-atributi',
  templateUrl: './atributi.component.html',
  styles: [
  ]
})

export class AtributiComponent implements OnInit {

  constructor(private dialog: MatDialog, public service: AtributeService) { 

  }
  data: [];
  dtOptions: DataTables.Settings = {
    "paging":   false,
  "ordering": false,
  "info":     false,
  "searching":     false,
  };
  ngOnInit(): void {
      this.getAll();
  }
  refresh(){
  }
  getAll(){
  this.service.getAll().subscribe(
    (res: any) => {
      if (res.success) {
     this.data=res.list;
     console.log("🚀 ~ file: atributi.component.ts ~ line 22 ~ AtributiComponent ~ ngOnInit ~ this.data", this.data)
      }
    },
    (error: any) => {                           
     
    }
  );
}
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Test'
  };
  dialogConfig.position = {
    top: '0',
    left: '0'
};
let dialogRef = this.dialog.open(FormAtributeComponent, dialogConfig);
dialogRef.afterClosed().subscribe(result => {
      this.service.formModel.reset();
    this.getAll();
    });
}
}
