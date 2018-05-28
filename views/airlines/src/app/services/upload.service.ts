import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
const addr: string = "http://localhost:3000/";


@Injectable()

export class uploadService {
    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }
    uploadFile(fd) {
        return this.http.post(addr + "upload", fd, {
            reportProgress: true,
            observe: 'events'
        })
    }


}