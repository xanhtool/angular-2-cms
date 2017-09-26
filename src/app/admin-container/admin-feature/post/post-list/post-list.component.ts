import { AuthService } from './../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../admin-shared/services/admin-post.service';
import { EventService } from './../../../admin-shared/services/event.service';
import { Component, OnInit } from '@angular/core';
import { ExampleDataSource } from './shared/data-source';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  user: any;
  sortList = [
    {
      mode: 0,
      label: 'Đã đăng',
      queryByChild: 'postMark/isPublished',
      equalTo: true
    },
    {
      mode: 1,
      label: 'Nháp',
      queryByChild: 'postMark/isPublished',
      equalTo: false
    },
    {
      mode: 2,
      label: 'Nổi bật',
      queryByChild: 'postMark/isFeatured',
      equalTo: true
    },
     {
      mode: 3,
      label: 'Trang chủ',
      queryByChild: 'postMark/isHome',
      equalTo: true
    }
  ];

  constructor(
    private eventService: EventService,
    private adminPostService: AdminPostService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.eventService.addEvent('userSelectedPost');
    this.eventService.addEvent('tabSort');
    this.eventService.emitEvent('tabSort',this.sortList[0].label);
  }

  modeChange(mode) {
    this.eventService.emitEvent('tabSort',mode.tab.textLabel);
  }
}
