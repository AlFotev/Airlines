import { Injectable } from "@angular/core";

@Injectable()

export class SessionService {
    public logged:boolean = false;
    public name:string = '';
    public access:Array<string> = [];
    constructor(
    ) {
    }
    checkSession(){
        return this.logged;
    }
    isAdmin(){
        if(this.access.indexOf("Admin") > -1){
           return true;
        }
        return false;
    }
    loginSession(username:string, roles:Array<string>){
      this.logged = true;
      this.name = username;
      this.access = roles;
    }
    logoutSession(){
     this.logged = false;
     this.name = '';
     this.access = [];
    }
    getName(){
        return this.name;
    }
}