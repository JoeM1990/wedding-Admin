import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompleClientComponent } from './dashboard/pages/comple-client/comple-client.component';
import { CompleAdminComponent } from './dashboard/pages/comple-admin/comple-admin.component';
import { PaiementComponent } from './dashboard/pages/paiement/paiement.component';
import { GenerateComponent } from './dashboard/pages/generate/generate.component';
import { ListViewComponent } from './dashboard/pages/list-view/list-view.component';
import { NotificationComponent } from './dashboard/pages/notification/notification.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { ErrorComponent } from './dialog/error/error.component';
import { SuccessComponent } from './dialog/success/success.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { WaitingComponent } from './dialog/waiting/waiting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeSVGModule } from 'ngx-qrcode-svg';

import { HttpClientModule } from '@angular/common/http';
import { PaiementForfaitComponent } from './ui/paiement-forfait/paiement-forfait.component';
import { PaiementFormComponent } from './ui/paiement-form/paiement-form.component';

import {MatPaginatorModule} from '@angular/material/paginator';

//import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CompleClientComponent,
    CompleAdminComponent,
    PaiementComponent,
    GenerateComponent,
    ListViewComponent,
    NotificationComponent,
    ErrorComponent,
    SuccessComponent,
    ConfirmationComponent,
    WaitingComponent,
    PaiementForfaitComponent,
    PaiementFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatDialogModule,
    NgxQRCodeModule,
    QRCodeSVGModule,
    HttpClientModule,
    MatPaginatorModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
