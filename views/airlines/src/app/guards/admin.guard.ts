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
export class AdminGuard implements CanActivate {
  constructor(
    private sService : SessionService,
    private router : Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIsAdmin(state.url);
  }
  checkIsAdmin(url:string){
      if(this.sService.isAdmin()){
        return true;
      }
      this.router.navigateByUrl("/flights");
      return false;
  }
}