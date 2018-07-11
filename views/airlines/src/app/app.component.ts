import { Component, OnInit } from '@angular/core';
import { SessionService} from './services/session.service';
import {AuthService} from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public name:string;
  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private session:SessionService,
    private authService:AuthService
  ){

  }
  title = 'app';
  logout(){
    this.authService.logout()
    this.session.logoutSession();
    this.route.navigateByUrl("/flights");
  }
  ngOnInit(){
  }
}
