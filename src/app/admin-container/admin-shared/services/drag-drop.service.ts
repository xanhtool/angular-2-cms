import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class DragDropService {
  data:BehaviorSubject<any>;
  constructor() {
    this.data = new BehaviorSubject(null)
  }


}
