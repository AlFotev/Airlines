import { Injectable } from "@angular/core";
import { Router } from "../../../node_modules/@angular/router";

@Injectable()

export class SessionService {
    public logged: boolean = false;
    public name: string = '';
    public id: string = '';
    public access: Array<string> = [];
    constructor(
        private router:Router
    ) {
    }
    checkSession() {
        return this.logged;
    }
    isAdmin() {
        if (this.access.indexOf("Admin") > -1) {
            return true;
        }
        return false;
    }
    loginSession(username: string, roles: Array<string>, id: string) {
        this.logged = true;
        this.name = username;
        this.access = roles;
        this.id = id;
        this.router.navigateByUrl("/flights")
    }
    logoutSession() {
        this.logged = false;
        this.name = '';
        this.access = [];
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
}