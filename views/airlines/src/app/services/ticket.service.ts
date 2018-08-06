import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from '@angular/router';
const addr: string = "http://localhost:3000/";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable()

export class TicketService {
    constructor(
        private http: HttpClient,
        private route: Router,
        private router: ActivatedRoute
    ) {
    }
    createTicket(data) {
        return this.http.post(addr + `details/${data["flightId"]}`, data)
    }
    getTicket(id) {
        return this.http.get(addr + `tickets/${id}`)
    }
    buyTickets(arr,id){
            return this.http.post(addr + `shop/${id}`, arr)
    }
    getBoughtTickets(id){
        return this.http.get(addr + `shop/${id}`)
    }

}