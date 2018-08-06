import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { LoginForm } from '../../models/login.form.model';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import {DataServiceService} from '../../services/data-service.service'


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
    private route: Router,
    private dataS:DataServiceService
  ) { }

  login(dataLog) {
    this.authService.login(dataLog)
      .subscribe(data => {
        if(data["msg"] === "success"){
          this.username = data["name"];
          this.access = data["access"];
          this.state.loginSession(this.username,this.access,data["_id"]);
        }else if(data["msg"] === "wrong"){
          let notObj = {
            "report":false,
            "reportError":true,
            "msg":"Wrong email or password"
          }
          this.dataS.changeMessage(notObj)
        }
      }, err => {
        let notObj = {
          "report":false,
          "reportError":true,
          "msg":"Something went wrong, please try again"
        }
        this.dataS.changeMessage(notObj)
      })
  }




}
