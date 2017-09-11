import { AuthService } from './../../../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../../../admin-shared/services/admin-post.service';
import { EventService } from './../../../../../admin-shared/services/event.service';
import { Component, OnInit, Input } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ExampleDataSource } from './../data-source';

@Component({
  selector: 'app-post-list-tab',
  templateUrl: './post-list-tab.component.html',
  styleUrls: ['./post-list-tab.component.css']
})
export class PostListTabComponent implements OnInit {
  @Input() queryByChild: string;
  @Input() equalTo: string;
  // @Input() viewMode: string;

  displayedColumns: string[] = [
      'author', 
      'title', 
      'button',
    ];
  dataSource: ExampleDataSource | null;
  noData: boolean = false;

  constructor(
    public adminPostService: AdminPostService,
    public eventService: EventService,
    public authService: AuthService
  ) {
   }

  ngOnInit() {
     // loading data corresponding to viewmode
    this.dataSource = new ExampleDataSource(this.adminPostService,this.queryByChild,this.equalTo);
    
    
    // checking if there is no post, show 'không có dữ liệu'
    // this.dataSource.connect()
    // .subscribe((posts) => {
    //   if (posts.length == 0) this.noData = true;
    //   else this.noData = false;
    // })
  }

  viewPost(post) {
    this.eventService.emitEvent('userSelectedPost',post.postOption.slug)
  }

  deletePost(post) {
    this.adminPostService.deletePost(post);
  }
}
