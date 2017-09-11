import { SnackbarService } from './snackbar.service';
import { EventService } from './event.service';
import { AuthService } from './../../admin-core/services/auth.service';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminComponentService {

  items: FirebaseListObservable<any>;
  user: firebase.User;
  userUid: any;
  
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private eventService: EventService
  ) {
      // get user infomation
      this.authService.user.subscribe(user => {
        this.user = user;
        this.userUid = this.user.uid;
      })

      // create new event
      this.eventService.addEvent('postUploading',false)
   }


  getSetting() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/web-setting/');
  }

  updateSetting(setting) {
    let item: FirebaseObjectObservable<any> = this.db.object('/web-setting/');
    return item.update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }


  getNavbar() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/navbar/');
  }

  updateNavbar(place,setting) {
     let item: FirebaseObjectObservable<any> = this.db.object('/navbar/'+place);
    return item.update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getFooter() {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/footer/');
  }

  updateFooter(setting) {
    let item: FirebaseObjectObservable<any> = this.db.object('/footer/');
    return item.update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getCategories() {
    let item: FirebaseListObservable<any>;
    return item = this.db.list('/categories/');
  }

  addCategory(setting) {
    let item: FirebaseListObservable<any> = this.db.list('/categories/');
    return item.push(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã thêm danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  updateCategory(key,setting) {
    let item: FirebaseListObservable<any> = this.db.list('/categories/');
    return item.update(key,setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã sửa danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  deleteCategory(key) {
    let item: FirebaseListObservable<any> = this.db.list('/categories/');
    return item.remove(key)
    .then(() => {
      this.snackBarService.openSnackBar("Đã xoá danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  swapCategory(setting) {
    let item: FirebaseObjectObservable<any> = this.db.object('/');
    return item.update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã đổi vị trí danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
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

   getFaq() {
    let item: FirebaseListObservable<any[]>;
    return item = this.db.list('/faq/');
  }

  addFaq(setting) {
    let item: FirebaseListObservable<any[]> = this.db.list('/faq/');
    return item.push(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã thêm câu hỏi");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }
  
  updateFaq(key,setting) {
    let item: FirebaseListObservable<any[]> = this.db.list('/faq/');
    return item.update(key,setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã sửa câu hỏi");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  swapFaq(setting) {
    return this.db.object('/').update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã đổi vị trí câu hỏi");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  deleteFaq(key) {
    let item: FirebaseListObservable<any[]> = this.db.list('/faq/');
    return item.remove(key)
    .then(() => {
      this.snackBarService.openSnackBar("Đã xóa câu hỏi");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }


  getQuote() {
    let item: FirebaseListObservable<any>;
    return item = this.db.list('/quotes/');
  }

  addQuote(data) {
    let item: FirebaseListObservable<any> = this.db.list('/quotes/');
    return item.push(data).then(() => {
      this.snackBarService.openSnackBar("Đã thêm trích dẫn");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  updateQuote(key,data) {
    let item: FirebaseListObservable<any> = this.db.list('/quotes/');
    return item.update(key,data)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu trích dẫn!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  deleteQuote(key) {
    let item: FirebaseListObservable<any> = this.db.list('/quotes/');
    return item.remove(key).then(() => {
      this.snackBarService.openSnackBar("Đã xóa trích dẫn");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  swapQuote(setting) {
    return this.db.object('/').update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã đổi vị trí trích dẫn");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  sendValuation(value) {
    let item: FirebaseObjectObservable<any> = this.db.object('/valuation/'+this.userUid);
    return item.update(value)
    .then(() => {
      this.snackBarService.openSnackBar("Cảm ơn bạn đã gửi đánh giá!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getValuation(){
    return this.db.object('/valuation/'+this.userUid);
  }

  sendBug(bug){
    let item: FirebaseListObservable<any> = this.db.list('/bugs/');
    return item.push(bug).then(() => {
      this.snackBarService.openSnackBar("Đã gửi bug bạn gặp đến bác sĩ điều trị!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  sendFeature(data){
    let item: FirebaseListObservable<any> = this.db.list('/features/');
    return item.push(data).then(() => {
      this.snackBarService.openSnackBar("Đã gửi tính năng mới của bạn đến hòm ý tưởng!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  
}
