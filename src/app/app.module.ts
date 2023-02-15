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
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
