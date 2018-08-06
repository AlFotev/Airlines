import { Component, OnInit } from '@angular/core';
import { flightService } from '../../services/flight.service';
import { FlightComponent } from '../flight/flight.component';
import { SearchComponent } from '../search/search.component'
import { SingleFlight } from '../../models/singleFlight.model';
import { PaginatorComponent } from '../paginator/paginator.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  public allFlights: SingleFlight[];
  public page: number;
  public length: number;
  public qpr: Object;
  public empty: String;
  public searched: boolean = false;
  constructor(
    private flightService: flightService,
    private router: Router,
    private route: ActivatedRoute,
    private location: PlatformLocation
  ) {
    this.route.queryParams.subscribe(p=>{
      if(!p["page"]){
        this.page = 1;
        this.router.navigate(["/flights"], {
          queryParams: {
            page: this.page
          }
        })
      }else{
        this.page = Number(p["page"]);
      
        this.qpr = {
          origin: this.route.snapshot.queryParams["origin"],
          destination: this.route.snapshot.queryParams["destination"],
          departureDate: this.route.snapshot.queryParams["departureDate"],
          page: this.page
        }
        this.flightService.getAllFlights(this.qpr).subscribe(response => {
          this.allFlights = response["msg"];
          this.length = response["length"];
          if (this.length < 1) {
            this.empty = "Sorry, there are no such flights!"
          }
          else{
            this.empty = '';
          }
        })
      }
    })
  }

  ngOnInit() {
  }
  takeCurrentPage(transitPage) {
    this.qpr["page"] = transitPage;
    this.flightService.getAllFlights(this.qpr)
      .subscribe(data => {
        this.allFlights = data["msg"];
      })
      , err => {
        console.log(err)
      }
  }
  invalidUserData(mistake){
    console.log(mistake)
    if(!mistake){
      this.empty = "Please enter valid search parameters!"
      console.log(this.empty)
    }
  }
}
