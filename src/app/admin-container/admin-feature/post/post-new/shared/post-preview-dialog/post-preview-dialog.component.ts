import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-preview-dialog',
  templateUrl: './post-preview-dialog.component.html',
  styleUrls: ['./post-preview-dialog.component.css']
})
export class PostPreviewDialogComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit() {
  }

}
