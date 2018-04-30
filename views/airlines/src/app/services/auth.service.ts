import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
const addr: string = "http://localhost:3000/";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }
    login(data): Observable<{}> {
        let body = {
            email: data.email,
            password: data.password
        }
        return this.http.post(
            addr + "login",
            body,
            httpOptions
        )
    }
    register(data):Observable<{}> {
        let body = {
            email: data.email,
            name:data.name,
            password: data.password
        }
        return this.http.post(
            addr + "register",
            body,
            httpOptions
        )
    }
}