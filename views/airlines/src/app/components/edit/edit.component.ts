import { Component, OnInit } from '@angular/core';
import { flightService } from '../../services/flight.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FlightForm} from '../../models/flight.model';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public id: string;
  public flightData = new FlightForm('', '', '', '');
  public fd = new FormData();
  public selectedFile: File = null;
  public image:string;
  constructor(
    private flightService: flightService,
    private router: Router,
    private route: ActivatedRoute,
    private dataS:DataServiceService
  ) {
    this.route.params.subscribe(p => {
      this.id = p["id"];
    })
  }

  ngOnInit() {
    this.flightService.getDetails(this.id)
      .subscribe(response => {
        let currentFlight = response["flight"];
        this.flightData.origin = currentFlight["origin"];
        this.flightData.destination = currentFlight["destination"];
        this.flightData.depTime = currentFlight["departureTime"];
        this.flightData.depDate = currentFlight["departureDate"];
        this.image = currentFlight["image"];
      })
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.fd.append(
      'origin', this.flightData.origin
    )
    this.fd.append(
      'destination', this.flightData.destination
    )
    this.fd.append(
      'depTime', this.flightData.depTime
    )
    this.fd.append(
      'depDate', this.flightData.depDate
    )
    this.fd.append(
      'image', this.selectedFile,
    )
  }
  upload() {
    this.flightService.editFlight(this.fd,this.id)
      .subscribe(response => {
        let flight = response["msg"]
        let notObj = {
          "report":true,
          "reportError":false,
          "msg":"Flight updated!"
        }
        this.dataS.changeMessage(notObj);
        this.router.navigateByUrl(`/details/${flight["_id"]}`)
      })
  }

}
