import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { LoginForm } from '../../models/login.form.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public logData = new LoginForm('', '');
  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  login(dataLog) {
    this.authService.login(dataLog)
      .subscribe(data => {
        console.log( data)
      }, err => {
        console.log(err)
      })
  }




}
