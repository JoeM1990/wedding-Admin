import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompleAdminComponent } from './dashboard/pages/comple-admin/comple-admin.component';
import { CompleClientComponent } from './dashboard/pages/comple-client/comple-client.component';
import { GenerateComponent } from './dashboard/pages/generate/generate.component';
import { PaiementComponent } from './dashboard/pages/paiement/paiement.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'compte-admin', component:CompleAdminComponent},
  { path: 'compte-clients', component:CompleClientComponent},
  { path: 'paiement', component:PaiementComponent},
  { path: 'generate', component:GenerateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
