import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AtributeService } from './../../services/atribute.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-atribute',
  templateUrl: './form-atribute.component.html',
  styles: [

  ]
})
export class FormAtributeComponent implements OnInit {
  form: FormGroup;
  description:string;
  constructor(   
    private toastr: ToastrService,
    public service:AtributeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormAtributeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.description;
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []]
  });
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
onSubmit() {
  this.service.create().subscribe(
    (res: any) => {
      if (res.success) {
        this.service.formModel.reset();
        this.toastr.success('Novi atribut je kreiran!', 'Uspješno kreiranje atributa.');
        this.save();
      }
    },
    (error: any) => {                           
      this.toastr.error(error.error.message, 'Kreiranje nije uspjelo.');
    }
  );

}

changeUnit($event){

  

}

}
