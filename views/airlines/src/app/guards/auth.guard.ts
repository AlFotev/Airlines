import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
  Route
} from '@angular/router';
import {SessionService} from '../services/session.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private sService : SessionService,
    private router : Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIsLoged(state.url);
  }
  checkIsLoged(url:string){
      if(this.sService.checkSession()){
        return true;
      }
      this.router.navigateByUrl("/login");
      return false;
  }
}