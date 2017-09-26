import { BlogAuthService } from './../../core/services/blog-auth.service';
import { EventService } from './../../../admin-container/admin-shared/services/event.service';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable,FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class BlogPostService {

  constructor(
    private db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    private eventService: EventService,
    private blogAuthService:BlogAuthService
  ) {
  }
  
  getHomeFeaturePosts() {
    return this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/isHome',
        equalTo: true
      }
    }).map((posts:any[]) =>posts.reverse());
  }

  getPageCategoryPosts(category,lastKey = null) {
    let query = {
        orderByChild: 'postOption/category',
        equalTo: category,
        limitToLast:3
    }
    if (lastKey) {
      query['endAt'] = { value: category, key: lastKey };
      delete query.equalTo;
    }
    return  this.db.list('/posts/',{query})
    .distinctUntilChanged().map((posts:any[]) =>posts.reverse())
  }

  getHomeTimelinePosts(lastKey = null) {
    let query = {
        orderByKey: true,
        limitToLast:3
    }
    if (lastKey) query['endAt'] = lastKey
    return  this.db.list('/posts/',{query})
    .distinctUntilChanged().map((posts:any[]) =>posts.reverse());
  }

  getRecentPosts(n) {
    return this.db.list('/posts/',{
      query: {limitToLast: n}
    }).map((posts:any[]) =>posts.reverse());
  }

  getMostViewPosts(n) {
    return this.db.list('/posts/',{
      query: {
        orderByChild: 'postInformation/view',
        limitToLast: n
      }
    }).map(posts => posts.reverse());
  }

  getCategoryPosts(category, limit?) {
    return this.db.list('/posts/',{
      query: {
        orderByChild: 'postOption/category',
        equalTo: category,
        limitToLast: limit
    }
    }).map((posts:any[]) =>posts.reverse());
  }

  getCategoryFeaturePosts(category, limit?) {
    return this.db.list('/posts/',{
      query: {
        orderByChild: 'postMark/featureType',
        equalTo: category,
        limitToLast: limit || null
      }
    }).map((posts:any[]) =>posts.reverse());
  }

  getPost(slug) {
    return this.db.list('/posts/',{
      query: {
        orderByChild:'postOption/slug',
        equalTo: slug
      }
    }).map(posts => posts[0]);
  }

  countView(uid) {
    this.blogAuthService.user.subscribe(user => {
      if (!user) console.log('count');
      if (!user) return this.db.object('/posts/'+uid+'/postInformation/view').$ref.ref.transaction(view => view + 1);
    })
  }



}
