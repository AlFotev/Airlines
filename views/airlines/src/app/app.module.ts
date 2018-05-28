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
////
import {AuthService} from './services/auth.service';
import {SessionService} from './services/session.service';
import {AdminGuard} from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { uploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlightsComponent,
    AdminComponent
  ],
  imports: [NgbModule.forRoot(),
    BrowserModule,
    RouteRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [AuthService,SessionService,AdminGuard,uploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
