import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { TicketService } from '../../services/ticket.service';
import { SessionService } from '../../services/session.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public addedTickets: Array<any> = [];
  public totalSumOfTickets: number;
  constructor(private dataS: DataServiceService,
    private ticketService: TicketService,
    private sS: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.dataS.currentData.subscribe(arr => {
      this.totalSumOfTickets = 0;
      this.addedTickets = arr;
      if (this.addedTickets) {
        this.addedTickets.map(t => this.totalSumOfTickets += Number(t.price))
      }
    })
  }
  remove(event) {
    event.preventDefault();
    let targetId = event.target.attributes.id.nodeValue;
    this.addedTickets = this.addedTickets.filter(t => t._id !== targetId);
    this.dataS.changeData(this.addedTickets);
  }
  checkOut(event) {
    event.preventDefault();
    this.totalSumOfTickets = 0;
    let id = this.sS.getId();
    if (this.addedTickets.length > 0) {
      this.ticketService.buyTickets(this.addedTickets, id)
        .subscribe(res => {
          let notObj = {
            "report":true,
            "reportError":false,
            "msg":"Flights successfuly bought"
          }
          this.addedTickets = [];
          this.dataS.changeData(this.addedTickets)
          this.dataS.changeMessage(notObj)
          this.router.navigateByUrl("/mytickets")
        })
    } else {
      return;
    }
  }
}
