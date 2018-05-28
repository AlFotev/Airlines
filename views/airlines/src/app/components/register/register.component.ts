import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { RegisterForm } from '../../models/register.form.model';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username :string;
  public userData = new RegisterForm('', '', '','');
  constructor(
    private state:SessionService,
    private authService: AuthService,
    private route: Router) { }

    register(data){
      this.authService.register(data)
      .subscribe(info => {
       this.username = info["name"];
       this.state.loginSession(this.username,[]);
       this.route.navigateByUrl("/flights")
      },err=>{
        console.log(err)
      })
    }

}
