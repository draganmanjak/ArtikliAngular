import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  public barLabel: string = "Jačina lozinke:";
  constructor(public service: UserService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.success) {
          this.service.formModel.reset();
          this.router.navigate(['/user/login']);
          this.toastr.success('Novi korisnik je kreiran!', 'Registracija je uspješna.');
        }
      },
      (error: any) => {                           
        this.toastr.error(error.error.message, 'Registracija nije uspjela.');
      }
    );
  }

}
