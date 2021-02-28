import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./user/registration/registration.component"
import {LoginComponent} from "./user/login/login.component"
import {UserComponent} from "./user/user.component"
import {HomeComponent} from "./home/home.component"
import {AtributiComponent} from "./atributi/atributi.component"
import {ArtikliComponent} from "./artikli/artikli.component"
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],
   children: [
    {path:'artikli',component:ArtikliComponent,canActivate:[AuthGuard]},
  {path:'atributi',component:AtributiComponent,canActivate:[AuthGuard]}
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
