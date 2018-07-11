import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from '@angular/router';
const addr: string = "http://localhost:3000/";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable()

export class flightService {
    constructor(
        private http: HttpClient,
        private route: Router,
        private router: ActivatedRoute
    ) {
    }
    createFlight(fd) {
        return this.http.post(addr + "upload", fd, {
            reportProgress: true,
            observe: 'events'
        })
    }

    getAllFlights(data) {      
        return this.http.post(addr + `flights`,data,httpOptions);
    }
    search(data){
        return this.http.post(addr + `flights`,data,httpOptions);
    }
    getAllFlightDestinations(){
        return this.http.get(addr + `flights/dest`);
    }
    getAllFlightOrigins(){
        return this.http.get(addr + `flights/ori`);
    }


}