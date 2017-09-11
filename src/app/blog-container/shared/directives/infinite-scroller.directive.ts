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

  private scrollEvent$;
  private userScrolledDown$;
  private requestStream$;
  private requestOnScroll$;

  // @Input() immediateCallback:boolean = false;
  // @Input() scrollPercent = 70;
  @Output('fetch')  fetch = new EventEmitter();

  isUserScrollingDown = (positions) => {
    return positions[0] < positions[1];
  }

  isScrollExpectedPercent = (position) => {
    console.log(position,this.elm.nativeElement.offsetTop+this.elm.nativeElement.offsetHeight)
    return position + 240 > this.elm.nativeElement.offsetTop+this.elm.nativeElement.offsetHeight;
  }

  constructor(private elm: ElementRef,private renderer2:Renderer2) { }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }

  private registerScrollEvent() {
    this.scrollEvent$ = new Subject();
    this.renderer2.listen('window','wheel',(event) => this.scrollEvent$.next(event))
  }

  streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
    .map((e: any) => e.pageY)
    .pairwise()
    .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
  }
  

  requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;
    this.requestOnScroll$
    .map(() => this.fetch.emit(1))
    .subscribe(() => { });
  }

}
