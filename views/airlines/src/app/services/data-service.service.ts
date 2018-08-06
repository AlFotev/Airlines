import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataServiceService {
  private data = new BehaviorSubject<Array<any>>([]);
  private boughtItems = new BehaviorSubject<Array<any>>([]);
  private message = new BehaviorSubject<{}>({})
  currentData = this.data.asObservable();
  currentItems = this.boughtItems.asObservable();
  currentMessage = this.message.asObservable();
  constructor() { }
  changeData(arr: Array<any>) {
    this.data.next(arr);
  }
  buyItems(arr: Array<any>) {
    this.boughtItems.next(arr);
  }

  changeMessage(obj) {
    this.message.next(obj);
  }
}
