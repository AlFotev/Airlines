import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {FlightsComponent} from '../components/flights/flights.component';
import {AdminComponent} from '../components/admin/admin.component';
import {AdminGuard} from '../guards/admin.guard';

const routes: Routes = [
  { path: "", redirectTo: "flights" , pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "admin", canActivate:[AdminGuard],component: AdminComponent },
  { path: "register", component: RegisterComponent },
  { path: "flights", component: FlightsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
