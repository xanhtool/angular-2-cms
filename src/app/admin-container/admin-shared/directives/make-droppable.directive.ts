import { DragDropService } from './../services/drag-drop.service';
import { Directive, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMakeDroppable]'
})
export class MakeDroppableDirective {

  @Output() dropped: EventEmitter<any> = new EventEmitter();
  
  constructor(private _elementRef: ElementRef,
    private dragDropService:DragDropService) {}
  
  ngOnInit() {
    let el = this._elementRef.nativeElement;

    el.style.cursor = 'pointer'


    // Add a style to indicate that this element is a drop target
    el.addEventListener('dragenter', (e) => {
      el.classList.add('over');
    });

    // Remove the style
    el.addEventListener('dragleave', (e) => {
      el.classList.remove('over');
    });

    el.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';
      return false;
    });

    // On drop, get the data and convert it back to a JSON object
    // and fire off an event passing the data
    el.addEventListener('drop', (e) => {
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
      el.classList.remove('over');
      this.dragDropService.data.subscribe(data =>this.dropped.emit(data))
      return false;
    })
  }

}
