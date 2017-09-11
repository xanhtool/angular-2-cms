import { DragDropService } from './../services/drag-drop.service';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMakeDraggable]'
})
export class MakeDraggableDirective {

   @Input('appMakeDraggable') data: any;
  
  constructor(private _elementRef: ElementRef,
  private dragDropService:DragDropService) {}
  
  ngOnInit() {
    // Get the current element
    let el = this._elementRef.nativeElement;
    
    // Set the draggable attribute to the element
    el.draggable = 'true';
    
    // Set up the dragstart event and add the drag-src CSS class 
    // to change the visual appearance. Set the current todo as the data
    // payload by stringifying the object first
    el.addEventListener('dragstart', (e) => {
      el.style.opacity = 0.4;
      
      e.dataTransfer.effectAllowed = 'move';
      // e.dataTransfer.setData('text', JSON.stringify(this.data));
      this.dragDropService.data.next(this.data);
    });
    
    // Remove the drag-src class
    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      el.style.opacity = 1;
    });
  }
}
