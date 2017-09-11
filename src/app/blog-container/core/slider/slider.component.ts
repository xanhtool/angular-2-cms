import { BlogComponentService } from './../../shared/services/blog-component.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  quotes: any;
  constructor(
    private blogComponentService: BlogComponentService
  ) {
   }

  ngOnInit() {
     this.quotes = this.blogComponentService.getQuotes();
  }

  afterViewInit() {
  }

}
