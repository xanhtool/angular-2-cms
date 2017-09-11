import { Observable } from 'rxjs/Observable';
import { Directive, HostListener, ElementRef, Renderer2, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Subject } from "rxjs/Subject";
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnChanges {
  el:any;
  mousedrag:Observable<any>;
  mouseup:Observable<any>;
  mousedown:Observable<any>;
  mousemove:Observable<any>;
  @Input('appDraggable') isDragging: boolean = false;
  isDragging$:Subject<any> = new Subject();

  ngOnChanges(changes:SimpleChanges) {
    this.isDragging$.next(changes.isDragging.currentValue)
  }



  constructor(public element: ElementRef, public renderer: Renderer2) {
    this.el = element.nativeElement;
    
    // SOLUTION 3 to listen an event
    this.mouseup = Observable.fromEvent(this.el,'mouseup')
    this.mousedown = Observable.fromEvent(this.el,'mousedown')
    this.mousemove = Observable.fromEvent(this.el,'mousemove')


    this.mousedrag = this.mousedown
    .do((e:any) => e.preventDefault())
    .mergeMap((startEvent:any) => {
        return this.mousemove
        .takeUntil(this.mouseup)
        // .filter((moveEvent:any) => {
        //   let pos = {
        //     top:  moveEvent.clientY - startEvent.offsetY,
        //     toplimit: this.el.clientHeight - 700
        //   }
        //   return  -Math.abs(pos.toplimit) <= pos.top && pos.top <= 0 // not to far from bottom and top
        // })
      .do((event) => console.log('this event is allow',event))
        .map((moveEvent:any) => {
          return {
            top:  moveEvent.clientY - startEvent.offsetY,
            toplimit: this.el.clientHeight - 700
          }
        })
      })
  
      
        
  }

  ngOnInit() {
    this.mousedrag.combineLatest(this.isDragging$,(pos,isDrag) => {
      this.renderer.setStyle(this.el, 'position', 'relative');
      this.renderer.setStyle(this.el, 'cursor', '');
      if (isDrag) {
        this.renderer.setStyle(this.el, 'cursor', 'move');
        return pos;
      }
    })
    .filter (pos => pos)
    .subscribe({
      next: pos => {
        // Update position : solution 2
        this.renderer.setStyle(this.el, 'top', pos.top  + 'px');
      }
    });
  }

}
