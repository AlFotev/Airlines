import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { flightService } from '../../services/flight.service';
import { SingleFlight } from '../../models/singleFlight.model';
import { TicketService } from '../../services/ticket.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { TicketForm } from '../../models/ticket.model';
import { Observable } from "rxjs/Observable";
import { SessionService } from '../../services/session.service';
import { DataServiceService } from '../../services/data-service.service';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public id: string;
  public flight: SingleFlight;
  public destination: string;
  public origin: string;
  public date: string;
  public time: string
  public image: string;
  public price: string;
  public type: string;
  public number: string;
  public flightTickets: Array<any> = [];
  public businessTickets: Array<any> = [];
  public economyTickets: Array<any> = [];
  public businessPrice = 0;
  public economyPrice = 0;
  public cartItems: Array<TicketForm> = [];
  public ticketData = new TicketForm('', '', '', '', '', '', '', '', '');
  public economyTicket = new TicketForm('', '', '', '', '', '', '', '', '');
  public businessTicket = new TicketForm('', '', '', '', '', '', '', '', '');
  private data: Observable<any>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightService: flightService,
    private ticketService: TicketService,
    private ref: ChangeDetectorRef,
    private session: SessionService,
    private dataS: DataServiceService,
    private notS: NotificationService
  ) {
    let subs = this.route.params.subscribe(p => {
      this.id = p["id"];
    })
  }

  ngOnInit() {
    this.flightService.getDetails(this.id)
      .subscribe(response => {
        let currentFlight = response["flight"];
        this.origin = currentFlight["origin"];
        this.destination = currentFlight["destination"];
        this.time = currentFlight["departureTime"];
        this.date = currentFlight["departureDate"];
        this.image = currentFlight["image"];
      })
    this.ticketService.getTicket(this.id)
      .subscribe(tickets => {
        tickets["tickets"].map(t => { this.flightTickets.push(t) });
        this.flightTickets.map(t => {
          if (t["type"] == "Business") {
            this.businessTickets.push(t)
          } if (t["type"] == "Economy") {
            this.economyTickets.push(t)
          }
        });
      })
    this.dataS.currentData.subscribe(arr => {
      this.cartItems = arr;
    })
  }
  createSeat() {
    let data = {
      "price": this.ticketData.price,
      "number": this.ticketData.number,
      "type": this.ticketData.type,
      "flightId": this.id,
      "origin": this.origin,
      "destination": this.destination,
      "departureDate": this.date,
      "departureTime": this.time,
      "image": this.image
    };
    this.ticketService.createTicket(data)
      .subscribe(response => {
        if(response["ticket"] == "there's allready such a ticket"){
          let notObj = {
            "report":false,
            "reportError":true,
            "msg":response["ticket"]
          }
          console.log("hi from fail")
          this.dataS.changeMessage(notObj);
        }else{
          console.log("hi from win")
          let notObj = {
            "report":true,
            "reportError":false,
            "msg":"Ticket successfuly created"
          }
          this.dataS.changeMessage(notObj)
        }
        this.ticketService.getTicket(this.id)
          .subscribe(tickets => {
            this.flightTickets = [];
            tickets["tickets"].map(t => {
              this.flightTickets.push(t);
            });
            this.businessTickets = [];
            this.economyTickets = [];

            this.flightTickets.map(t => {
              if (t["type"] == "Business") {
                this.businessTickets.push(t)
              } if (t["type"] == "Economy") {
                this.economyTickets.push(t)
              }
            })
          }, error => {
            this.ticketData = new TicketForm('', '', '', this.id, this.origin, this.destination, this.date, this.time, this.image);
            this.notS.handleIt(error);
          })
        this.ticketData = new TicketForm('', '', '', this.id, this.origin, this.destination, this.date, this.time, this.image);
      })
  }
  addTicket(event) {
    let targetId = event.target.attributes.id.nodeValue;
    if (targetId == "eco") {
      let exist = this.checkForTicket(this.cartItems, this.flightTickets, this.economyTicket);
      if (exist) {
        let notObj = {
          "report":false,
          "reportError":true,
          "msg":"The ticket allready is in your cart"
        }
        this.dataS.changeMessage(notObj)
        return;

      }

      let filteredEconomyTickets = [];
      this.economyTickets.map(t => {
        if (t.number == this.economyTicket.number) {
          filteredEconomyTickets.push(t)
        }
      })
      this.cartItems.push(filteredEconomyTickets[0]);
      this.dataS.changeData(this.cartItems);
      this.economyTicket = new TicketForm('', '', '', '', '', '', '', '', '');
      this.economyPrice = 0;
      let notObj = {
        "report":true,
        "reportError":false,
        "msg":"Ticket successfuly added in your cart"
      }
      this.dataS.changeMessage(notObj)
    }
    if (targetId == "bus") {
      let exist = this.checkForTicket(this.cartItems, this.flightTickets, this.businessTicket);
      if (exist) {
        let notObj = {
          "report":false,
          "reportError":true,
          "msg":"The ticket allready is in your cart"
        }
        this.dataS.changeMessage(notObj)
        return;

      }

      let filteredBusinessTickets = [];
      this.businessTickets.map(t => {
        if (t.number == this.businessTicket.number) {
          filteredBusinessTickets.push(t)
        }
      })
      this.cartItems.push(filteredBusinessTickets[0]);
      this.dataS.changeData(this.cartItems);
      this.businessTicket = new TicketForm('', '', '', '', '', '', '', '', '');
      this.businessPrice = 0;
      let notObj = {
        "report":true,
        "reportError":false,
        "msg":"Ticket successfuly added in your cart"
      }
      this.dataS.changeMessage(notObj)
    }
    else {
      return;
    }
  }
  clear(event) {
    event.preventDefault();
    let targetId = event.target.attributes.id.nodeValue;
    if (targetId == "clearEco") {
      this.economyTicket = new TicketForm('', '', '', '', '', '', '', '', '');
      this.economyPrice = 0;
    }
    if (targetId == "clearBus") {
      this.businessTicket = new TicketForm('', '', '', '', '', '', '', '', '');
      this.businessPrice = 0;
    }
    else {
      return;
    }
  }
  priceTag(value) {

    this.flightTickets.map(t => {
      if (t.number == value && t.type == "Business") {
        this.businessPrice = t.price;
      }
      if (t.number == value && t.type == "Economy") {
        this.economyPrice = t.price;
      }
    })
  }
  checkForTicket(arr: Array<any>, arr1: Array<any>, ticket) {
    let exist: boolean = false;
    arr.map(t => {
      if (t.number == ticket.number) {
        arr1.map(t1 => {
          if (t1["flightId"] == t["flightId"] && t1["number"] == t["number"]) {
            exist = true;
          }
        })
      }
    })
    return exist;
  }
}
