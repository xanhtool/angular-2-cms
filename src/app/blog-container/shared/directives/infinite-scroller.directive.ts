import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Directive, AfterViewInit, ElementRef, Input, EventEmitter, Output, Renderer2 } from '@angular/core';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import { Subject } from "rxjs/Subject";


@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {
  scrollEvent$= new Subject();
  userScrolledDown$:Observable<any>;
  requestStream$:Observable<any>;
  requestOnScroll$:Observable<any>;
  isExpected = new BehaviorSubject(false);

  isUserScrollingDown = (positions) => {
    return positions[0] < positions[1];
  }

  isScrollExpectedPercent = (position) => {
    let trigger = position[1] > this.elm.nativeElement.offsetHeight
    this.isExpected.next(trigger)
    return trigger;
  }

  constructor(
    private elm: ElementRef,
    private renderer2:Renderer2
  ) { }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }

  private registerScrollEvent() {
    this.renderer2.listen('window','scroll',(event) => this.scrollEvent$.next(event))
  }

  streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
    .map((e: any) => e.target.body.scrollTop)
    .pairwise()
    .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions))
    .mergeMap(positions => this.isExpected)
  }
  

  requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;
    this.requestOnScroll$
    .distinct()
    .subscribe(() => { });
  }

}
