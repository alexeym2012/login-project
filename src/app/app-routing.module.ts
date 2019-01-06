import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SuccessComponent} from './success/success.component';
import {AuthGuardGuard} from './auth-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'success', component: SuccessComponent, canActivate: [AuthGuardGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
