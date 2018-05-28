import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { LoginForm } from '../../models/login.form.model';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public logData = new LoginForm('', '');
  public logged:boolean = false;
  public username: string;
  public access:Array<string> = [];
  constructor(
    private state:SessionService,
    private authService: AuthService,
    private route: Router
  ) { }

  login(dataLog) {
    this.authService.login(dataLog)
      .subscribe(data => {
        if(data["msg"] === "success"){
          this.username = data["name"];
          this.access = data["access"];
          this.state.loginSession(this.username,this.access);
          this.route.navigateByUrl("/flights")
        }else if(data["msg"] === "wrong"){
          console.log("Wrong email or password")
        }
      }, err => {
         console.log("something went wrong,please try again")
      })
  }




}
