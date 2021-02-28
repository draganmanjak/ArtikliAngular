import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http'
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { PasswordCheckComponent } from './help/password-check/password-check.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { ArtikliComponent } from './artikli/artikli.component';
import { AtributiComponent } from './atributi/atributi.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FormAtributeComponent } from './atributi/form-atribute/form-atribute.component';
import { MatTableModule } from '@angular/material/table' 
import { DataTablesModule } from 'angular-datatables';
import {MatPaginatorModule } from '@angular/material/paginator';
import { FormArtikliComponent } from './artikli/form-artikli/form-artikli.component';
import { ConfirmationDialogComponent } from './help/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    HomeComponent,
    PasswordCheckComponent,
    ArtikliComponent,

    AtributiComponent,
    FormAtributeComponent,

    FormArtikliComponent,

    ConfirmationDialogComponent,

  ],
  imports: [
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
