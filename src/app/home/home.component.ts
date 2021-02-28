
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtikliComponent } from '../artikli/artikli.component';
import { AtributiComponent } from '../atributi/atributi.component';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})


export class HomeComponent implements OnInit {

  @ViewChild(AtributiComponent) private atrComponent: AtributiComponent;
  @ViewChild(ArtikliComponent) private artComponent: ArtikliComponent;

  constructor(private router: Router) { }
  public index = 0;
  ngOnInit(): void {
    let currentUrl = this.router.url.toString();
    if(currentUrl.includes("atributi")){
      this.index=1;
    }else{
      this.index=0;
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  selectTab($event){
   switch ($event.index) {
     case 0:
     // this.artComponent.refresh();
      this.router.navigate(['home/artikli']);
       break;
     case 1:
      //this.atrComponent.refresh();
      this.router.navigate(['home/atributi']);
      break;
     default:
    
       break;
   }
}
}
