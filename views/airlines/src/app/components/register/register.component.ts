import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { RegisterForm } from '../../models/register.form.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public userData = new RegisterForm('', '', '','');
  constructor(private authService: AuthService,
    private route: Router) { }

    register(data){
      this.authService.register(data)
      .subscribe(info => {
        console.log(info)
      },err=>{
        console.log(err)
      })
    }

}
