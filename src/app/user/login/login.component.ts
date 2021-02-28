import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }

 
  constructor(private service: UserService, private router: Router, private toastr: ToastrService,private fb: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.model);
        this.router.navigateByUrl('/home/artikli');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Neispravna lozinka ili email.', 'Logovanje neuspješno.');
        else
          console.log(err);
      }
    );
  }
}
