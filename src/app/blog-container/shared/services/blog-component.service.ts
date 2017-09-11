import { EventService } from './../../../admin-container/admin-shared/services/event.service';
import { MdSnackBar } from '@angular/material';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/App'
@Injectable()
export class BlogComponentService {
  constructor(
    private db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    private eventService: EventService
  ) {
  }

  getQuotes() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/quotes/');
  }


  getFooter() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/footer/');
  }

  getCategories() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/categories/');
  }

  getNavbarCategories() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/categories/',{
      query:{
        orderByChild: 'onNavbar',
        equalTo: true
      }
    });
  }

  getCategoryPosts(category,orderByChild?,equalTo?,limitToFirst?) {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/categories/'+category,{
      query:{
        orderByChild: orderByChild,
        equalTo: equalTo,
        limitToFirst:limitToFirst
      }
    });
  }

  getBanner() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/banner/');
  }

  saveBanner(setting) {
    return this.db.object('/banner/').update(setting);
  }


  getFaq() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/faq/');
  }

  getWebSetting() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/web-setting/');
  }

}
