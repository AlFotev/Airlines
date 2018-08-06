import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  public report: boolean = false;
  public reportError: boolean = false;
  public message: string = '';
  constructor() { }


  handleIt(param) {
    if (param["type"] == "error") {
      this.reportError = true;
      this.report = false;
    } else {
      this.reportError = false;
      this.report = true;
    }
    this.message = param["msg"];
    return  this.message;
  }
  getErrState(){
    return this.reportError;
  }
  getNoErrState(){
     return this.report;
  }
}
