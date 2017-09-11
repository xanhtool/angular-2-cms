import { Directive, ElementRef, Output, EventEmitter, OnChanges, Input} from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContenteditableModelDirective implements OnChanges{
  @Input('contenteditableModel') model: any;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;

  constructor(private elRef: ElementRef) { }

  onBlur() {
    let value = this.elRef.nativeElement.textContent;
    this.lastViewModel = value;
    this.update.emit(value)
  }


  ngOnChanges(changes) {
    if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
      this.lastViewModel = this.model
      this.refreshView()
    }
  }

  private refreshView() {
    this.elRef.nativeElement.textContent = this.model
  }

}
