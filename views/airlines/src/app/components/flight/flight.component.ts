import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {SingleFlight} from '../../models/singleFlight.model';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
   @Input("theFlight") theFlight: SingleFlight;
   public _id:string;
    public origin:string;
    public destination:string;
    public depDate:string;
    public depTime:string;
    public image:SafeUrl;
  constructor(
    private sanitizer:DomSanitizer
  ) {
   }

  ngOnInit() {
    this._id = this.theFlight._id ? this.theFlight._id : '';
    this.origin = this.theFlight.origin ? this.theFlight.origin : '';
    this.destination = this.theFlight.destination ? this.theFlight.destination : '';
    this.depDate = this.theFlight.departureDate ? this.theFlight.departureDate : '';
    this.depTime = this.theFlight.departureTime ? this.theFlight.departureTime : '';
    this.image = this.sanitizer.bypassSecurityTrustUrl(this.theFlight.image);
  }

}
