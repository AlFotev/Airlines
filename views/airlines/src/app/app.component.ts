import { Component, OnInit, trigger, state, style, transition,animate } from '@angular/core';
import { SessionService} from './services/session.service';
import {AuthService} from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {DataServiceService} from './services/data-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {NotificationService} from './services/notification.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[

    trigger('popOverState',[
      state("show" , style({
        opacity:1
      })),
      state("hide" , style({
        opacity:0
      })),
      transition("show=>hide",animate('1000ms ease-out')),
      transition("hide=>show",animate('1000ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit{
  public name:string;
  public items:number = 0;
  public message:string = '';
  public reportError:boolean;
  public report:boolean;
  public show:boolean = true;

  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private session:SessionService,
    private authService:AuthService,
    private notServ:NotificationService,
    private dataS:DataServiceService
  ){

  }
  title = 'app';
  logout(){
    this.authService.logout()
    this.session.logoutSession();
    this.items = 0;
    this.route.navigateByUrl("/flights");
    this.reportError = true;
    let notObj = {
      "report":false,
      "reportError":true,
      "msg":"Goodbye, I'l miss ya"
    }
    this.dataS.changeMessage(notObj);
  }
  ngOnInit(){
    this.dataS.currentData.subscribe(arr=>{
      this.items = arr.length;
    })
    this.dataS.currentMessage.subscribe(obj=>{
      this.report = obj["report"];
      this.reportError = obj["reportError"];
      this.message = obj["msg"];
      this.toggleState()
      console.log(this.show)
    })
  }
  stateName(){
    return this.show ? "show" : "hide";
  }
  toggleState(){
    this.show = !this.show;
  }
  hide(){
    this.show = false;
  }
}
