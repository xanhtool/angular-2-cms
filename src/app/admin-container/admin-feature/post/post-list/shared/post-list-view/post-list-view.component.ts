import { AuthService } from './../../../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../../../admin-shared/services/admin-post.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { EventService } from './../../../../../admin-shared/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent implements OnInit {
  post: Observable<any>;
  viewMode: string;
  userUid: any;
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
    public eventService: EventService,
    public adminPostService: AdminPostService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    // TODO: delete this
    this.authService.user.subscribe(user => this.userUid = user.uid)

    let firstPostOfTabSource = this.eventService.subscribeEvent('tabSort')  // creating source 1 (tab select)
    .map(sortLabel => this.sortList.filter(sort => sort.label == sortLabel)[0]) // find sort that have label the same sort label
    .mergeMap((sort:any) => this.adminPostService.getPostCustom(sort.queryByChild,sort.equalTo,1)) // change stream to get Post
    .map(postList => {
      if (postList.length == 0) return Observable.of(null); // if click to sort that doesn't have post, we set post to null
      return postList; // if have post, just return
    })
    .mergeAll() // transform array with one object item to object item

    let userSelectPostSource = this.eventService.subscribeEvent('userSelectedPost') // creating source 2 (user click)
    .mergeMap(slug => this.adminPostService.getPost(slug)) // change stream to getPost stream
    .filter(post => post.$key != "null") // filter, not allow post doesn't have value
    
    this.post = Observable.merge(firstPostOfTabSource,userSelectPostSource) // using post data trigger by tab or user click

    // .subscribe(post => {
    //   this.post = post;
    //   //  if (tabNumber == 0) {
    //   //     this.eventService.addEvent('viewPublishPost');
    //   //     this.post = this.eventService.subscribeEvent('viewPublishPost'); 
    //   //     this.viewMode = 'viewPublishPost';
    //   //   } else if (tabNumber == 1) {
    //   //     this.eventService.addEvent('viewDraftPost');
    //   //     this.post = this.eventService.subscribeEvent('viewDraftPost');
    //   //     this.viewMode = 'viewDraftPost'; 
    //   //   }
    //   //   else if(tabNumber == 2) {
    //   //     this.eventService.addEvent('viewPinPost');
    //   //     this.post = this.eventService.subscribeEvent('viewPinPost');
    //   //     this.viewMode = 'viewPinPost'; 
    //   //   }
    //   //   else if(tabNumber == 3) {
    //   //     this.eventService.addEvent('viewHomePost');
    //   //     this.post = this.eventService.subscribeEvent('viewHomePost');
    //   //     this.viewMode = 'viewHomePost'; 
    //   //   }
    // })
  }

  pinPost(post,value) {
    this.adminPostService.pinPost(post,value)
  }

  homePost(post,value) {
    value = !value;
    this.adminPostService.homePost(post,value)
  }


}
