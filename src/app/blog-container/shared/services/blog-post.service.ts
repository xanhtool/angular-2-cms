import { EventService } from './../../../admin-container/admin-shared/services/event.service';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable,FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
@Injectable()
export class BlogPostService {

  constructor(
    private db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    private eventService: EventService
  ) {
  }
  
  getHomeFeaturePosts() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/isHome',
        equalTo: true
      }
    });
  }

  getHomeTimelinePost(n) {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/posts/',{
      query: {
        limitToLast: 1*n,
        orderByChild: 'postMark/isPublished',
        equalTo: true
      }
    });
  }

  getRecentPost(n) {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/isPublished',
        equalTo: true,
        limitToFirst: n
      }
    });
  }

  getCategoryPost(category, limit?) {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/publishType',
        equalTo: category,
        limitToFirst: limit || null
      }
    })
  }

  getCategoryFeaturePost(category, limit?) {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/featureType',
        equalTo: category,
        limitToFirst: limit || null
      }
    })
  }

  getPost(slug) {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/posts/'+slug);
  }



}
