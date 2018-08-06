import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { RegisterForm } from '../../models/register.form.model';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { DataServiceService } from '../../services/data-service.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username: string;
  public userData = new RegisterForm('', '', '', '');
  constructor(
    private state: SessionService,
    private authService: AuthService,
    private route: Router,
  private dataS:DataServiceService) { }

  register(data) {
    this.authService.register(data)
      .subscribe(user => {
        this.authService.login(data)
          .subscribe(feed => {
            if (feed["msg"] === "success") {
              this.username = feed["name"];
              this.state.loginSession(this.username, [], feed["_id"]);
              let notObj = {
                "report":true,
                "reportError":false,
                "msg":"You have successfuly registered, Welcome to flight service!"
              }
              this.dataS.changeMessage(notObj);
            } else if (feed["msg"] === "wrong") {
              let notObj = {
                "report":false,
                "reportError":true,
                "msg":"Something went wrong, please try again"
              }
              this.dataS.changeMessage(notObj);
            }
          }, errorr => {
            let notObj = {
              "report":false,
              "reportError":true,
              "msg":"Something went wrong, please try again"
            }
            this.dataS.changeMessage(notObj);
          })

      }, err => {
        console.log(err)
      })
  }

}
