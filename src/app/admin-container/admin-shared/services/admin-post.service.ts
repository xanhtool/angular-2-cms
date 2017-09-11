import { PostOption } from './../../admin-feature/post/post-new/shared/post-option';
import { AdminFileService } from './admin-file.service';
import { Category } from './../../admin-single/category/shared/category';
import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { Post } from './../../admin-feature/post/post-new/shared/post';
import { EventService } from './event.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../admin-core/services/auth.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminPostService {

   items: FirebaseListObservable<any>;
  user: firebase.User;
  userUid: any;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private eventService: EventService,
    private adminFileService: AdminFileService
  ) {
      // get user infomation
      this.authService.user.subscribe(user => {
        this.user = user;
        this.userUid = this.user.uid;
      })

      // create new event
      this.eventService.addEvent('postUploading',false)
   }



  uploadPost(slug,postData:Post,isPublished?,authorUid?) {
    if (isPublished == true) console.log('đang xuất bản')
    else console.log('đang đăng nháp')
    this.eventService.subscribeEvent('postUploading').next(true);
    postData['postMark']['isPublished'] = isPublished;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};

    updates['/posts/' + slug] = postData;
    updates['/users/' + postData.authorUid + '/posts/' + slug] = true;


    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu thành công!");
      this.eventService.subscribeEvent('postUploading').next(false);
    })
    // 
    .catch((e) => {
      this.eventService.subscribeEvent('postUploading').next(false);
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",3000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000);
    })
  }


  getPost(slug) {
    let item: FirebaseObjectObservable<any>;
    return item = this.db.object('/posts/' + slug);
  }

  deletePost(post,slug?) {
    this.eventService.addEvent('postDeleting');
    this.eventService.subscribeEvent('postDeleting').next(true);
    let updates = {};
    let postSlug = slug || post.postOption.slug; // post name or selected post;
    updates['/posts/' + postSlug] = null;
    updates['/users/' + post.authorUid + '/posts/' + postSlug] = null;
    if(post.postOption.image.name) this.adminFileService.deleteImage(post.postOption.image.name,'')
    .then(() => {
      this.snackBarService.openSnackBar("Đã xóa ảnh bài viết thành công!");
      this.eventService.subscribeEvent('postDeleting').next(false);
    });
    return this.db.object('/').update(updates)
    .then(() => {
      this.snackBarService.openSnackBar("Đã xóa thành công!");
      this.eventService.subscribeEvent('postDeleting').next(false);
    })
    .catch((e) => {
      this.eventService.subscribeEvent('postDeleting').next(false);
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",3000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000);
    })
  }

  updatePost(postValue,oldSlug,newSlug) {
    let updates = {};
    updates['/posts/' + oldSlug] = null;
    updates['/posts/' + newSlug] = postValue;
    updates['/users/' + postValue.authorUid + '/posts/' + oldSlug] = null;
    updates['/users/' + postValue.authorUid + '/posts/' + newSlug] = true;
    return this.db.object('/').update(updates)
    .then(() => {
      this.snackBarService.openSnackBar("Đã cập nhật thành công!");
    })
    .catch((e) => {
      this.eventService.subscribeEvent('postDeleting').next(false);
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",3000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000);
    })
  }

  pinPost(post,value) {
    let updates = {};
    updates['/posts/' + post.postOption.slug +'/postMark/isFeatured'] = value;

    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã đánh dấu!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000))
  }

  homePost(post, value) {
    let updates = {};
    updates['/posts/' + post.postOption.slug +'/postMark/isHome'] = value;
    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã gắn vào trang chủ!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000))
  }

  getPostCustom(orderByChild?,equalTo?,limitToFirst?) {
    // if (orderByChild == 'feature') {
    //   return this.db.list('/posts', {
    //     preserveSnapshot: true,
    //     query : {
    //       orderByChild: orderByChild,
    //     }
    //   })
    //   .map(posts => {
    //     return posts
    //     .filter((post:any) => post.hasChild("feature"))
    //     .map(post => post.val())
    //   })
    // }
    return this.db.list('/posts', {
        query : {
          orderByChild: null || orderByChild,
          equalTo: null || equalTo,
          limitToFirst: null || limitToFirst
        }
    })
  }

}
