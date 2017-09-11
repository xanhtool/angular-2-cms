import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:any;
  year: any;
  month: any;
  day: any;
  constructor() { }

  ngOnInit() {
   
  }

}