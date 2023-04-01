import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompleAdminComponent } from './dashboard/pages/comple-admin/comple-admin.component';
import { CompleClientComponent } from './dashboard/pages/comple-client/comple-client.component';
import { GenerateComponent } from './dashboard/pages/generate/generate.component';
import { ListViewComponent } from './dashboard/pages/list-view/list-view.component';
import { NotificationComponent } from './dashboard/pages/notification/notification.component';
import { PaiementComponent } from './dashboard/pages/paiement/paiement.component';
import { LoginComponent } from './login/login.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { PaiementForfaitComponent } from './ui/paiement-forfait/paiement-forfait.component';
import { PaiementFormComponent } from './ui/paiement-form/paiement-form.component';
import { AuthGuard } from './utils/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'splash-screen' },
  { path: 'login', component:LoginComponent},
  { path: 'splash-screen', component:SplashScreenComponent},
  { path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},
  { path: 'compte-admin', component:CompleAdminComponent,canActivate:[AuthGuard]},
  { path: 'compte-clients', component:CompleClientComponent,canActivate:[AuthGuard]},
  { path: 'paiement', component:PaiementComponent,canActivate:[AuthGuard]},
  { path: 'generate', component:GenerateComponent,canActivate:[AuthGuard]},
  { path: 'listes', component:ListViewComponent,canActivate:[AuthGuard]},
  { path: 'notifications', component:NotificationComponent,canActivate:[AuthGuard]},
  { path: 'paiement-form', component:PaiementFormComponent,canActivate:[AuthGuard]},
  { path: 'paiement-forfait', component:PaiementForfaitComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
