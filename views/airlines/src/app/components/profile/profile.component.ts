import { Component, OnInit } from '@angular/core';
import {PaginatorComponent} from '../paginator/paginator.component';
import { DataServiceService } from '../../services/data-service.service';
import { SessionService } from '../../services/session.service';
import { TicketService } from '../../services/ticket.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  public totalFlightTickets: number = 0;
  public boughtItems: Array<any> = [];
  public allFlightsAndTickets = {};
  public page: number;
  public length: number;
  public id: string;
  constructor(
    private sS: SessionService,
    private ticketS:TicketService,
    private dataS: DataServiceService) { 
      this.dataS.currentItems.subscribe(
        arr => {
          this.boughtItems = arr;
        })

    }

   ngOnInit() {
     this.boughtItems = [];
    this.id = this.sS.getId();
    this.allFlightsAndTickets = {}
     this.ticketS.getBoughtTickets(this.id)
    .subscribe(res=>{
      let tickets = res["tickets"];
      tickets.map(t=>{
        if(!this.allFlightsAndTickets[t["destination"]]){
          this.allFlightsAndTickets[t["destination"]] = [];
          this.allFlightsAndTickets[t.destination].push(t)
        }else{
          this.allFlightsAndTickets[t.destination].push(t)
        }
      })
        for(let key of Object.keys(this.allFlightsAndTickets)){
          let tempArr = [];
          let tempArr1 = [];
          tempArr.push(key)
           for(let k of this.allFlightsAndTickets[key]){
              tempArr1.push(k)
           }
           tempArr.push(tempArr1);
           this.boughtItems.push(tempArr)
        }
    },err=>{console.log(err)})
  }
  calcSum(arr){
    let sum = 0;
    arr.map(t=>{
      sum+= Number(t.price);
    })
    return sum;
  }
}
