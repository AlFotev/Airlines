import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FlightForm } from '../../models/flight.model';
import { flightService } from '../../services/flight.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onReacted = new EventEmitter<Array<any>>();
  @Output() onAction = new EventEmitter<Object>();
  @Output() onError = new EventEmitter<boolean>();
  public pageNum: number;
  public results: Array<any>;
  public qParams: Object;
  public destinations: Array<any>;
  public origins: Array<any>;
  public mistakenForm: boolean;
  public flightData = new FlightForm('', '', '', '');
  constructor(private flightService: flightService,
    private router: Router,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(p => {
      this.flightService.getAllFlightDestinations()
        .subscribe(destinations => {
          this.destinations = destinations["msg"];
        })
      this.flightService.getAllFlightOrigins()
        .subscribe(origins => {
          this.origins = origins["msg"];
        })
    })

  }
  ngOnInit() {
  }
  search() {
    var patt = new RegExp("[0-9]+-[0-9]+-[0-9]+");
    var res = patt.test(this.flightData.depDate);
    if (this.flightData.origin == '' || this.flightData.origin == '-----------------'
      || this.flightData.destination == '' || this.flightData.destination == '-----------------'
      || !res) {
      this.mistakenForm = false;
      this.onError.emit(this.mistakenForm)
      return
    } else {
      let data = {
        origin: this.flightData.origin,
        destination: this.flightData.destination,
        departureDate: this.flightData.depDate,
        page: 1
      }
      this.qParams = data;
      this.router.navigate(['/flights'],
        { queryParams: this.qParams }
      )
      this.flightData = new FlightForm('', '', '', '');
    }
  }
}
