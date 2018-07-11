import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouteRoutingModule } from './route/route-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
///
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightComponent} from './components/flight/flight.component';
////
import {AuthService} from './services/auth.service';
import {SessionService} from './services/session.service';
import {AdminGuard} from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { flightService } from './services/flight.service';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlightsComponent,
    AdminComponent,
    FlightComponent,
    PaginatorComponent,
    SearchComponent,
    DetailsComponent,
    EditComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [NgbModule.forRoot(),
    BrowserModule,
    RouteRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [AuthService,SessionService,AdminGuard,flightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
