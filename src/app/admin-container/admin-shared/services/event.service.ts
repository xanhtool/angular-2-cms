import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
  events:Object = {};
  constructor() {
     
   }

  addEvent(eventName,initValue?) {
    this.events[eventName] = new BehaviorSubject(initValue || null)
  }

  emitEvent(eventName,value) {
    this.events[eventName].next(value)
  }

  subscribeEvent(eventName) {
    let observer: BehaviorSubject<any> =  this.events[eventName];
    return observer;
  }

  demo(){
    this.addEvent('demo',true)
  }
}
