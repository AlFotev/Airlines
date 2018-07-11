import { Component, OnInit } from '@angular/core';
import { FlightForm } from '../../models/flight.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { flightService } from '../../services/flight.service';
let uri = "http://localhost:3000/upload";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public flightData = new FlightForm('', '', '', '');
  public fd = new FormData();
  public selectedFile: File = null;
  constructor(private route: Router,
    private flightService: flightService
  ) {

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
    this.flightService.createFlight(this.fd)
      .subscribe(response => {
       if(response.type == 4){
        this.route.navigateByUrl("/flights")
       }      
      })
  }
  
}
