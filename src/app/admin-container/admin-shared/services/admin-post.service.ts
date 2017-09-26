import { Router } from '@angular/router';
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
    private adminFileService: AdminFileService,
    private router: Router
  ) {
      // get user infomation
      this.authService.user.subscribe(user => {
        this.user = user;
        this.userUid = this.user.uid;
      })
      // create new event
      this.eventService.addEvent('postUploading',false)
   }

   getNewPostKey() {
    // Get a key for a new Post.
    return firebase.database().ref().child('posts').push().key;
   }

  uploadPost(postValue:Post,isPublished) {
    this.eventService.addEvent('postUploading',true);
    postValue['postMark']['isPublished'] = isPublished;
    // place to update
    let updates = {};
    if (isPublished) updates['/posts/' + postValue.uid] = postValue;
    else updates['/draft-posts/' + postValue.uid] = postValue;
    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu thành công!");
      this.eventService.emitEvent('postUploading',false);
      if(isPublished) this.router.navigate(['admin','post-edit',postValue.postOption.slug])
      else this.router.navigate(['admin','draft-edit',postValue.postOption.slug])
    })
    .catch((e) => {
      this.eventService.emitEvent('postUploading',false);
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",7000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",7000);
    })
  }

  updatePost(postValue,isPublished) {
    this.eventService.addEvent('postUploading',true)
    let updates = {};
    if (isPublished) updates['/posts/' + postValue.uid] = postValue
    else updates['/draft-posts/' + postValue.uid] = postValue;
    return this.db.object('/').update(updates)
    .then(() => {
      this.snackBarService.openSnackBar("Đã cập nhật thành công!");
      this.eventService.emitEvent('postUploading',false);
      if (isPublished) this.router.navigate(['admin','post-edit',postValue.postOption.slug])
      else this.router.navigate(['admin','draft-edit',postValue.postOption.slug])
    })
    .catch((e) => {
      this.eventService.emitEvent('postUploading',false)
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",7000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",7000);
    })
  }


  getPost(slug,draft=false) {
    if (draft) return this.db.list('/draft-posts/').map(posts => posts[0]);

    return this.db.list('/posts/',{
      query: {
        orderByChild: 'postOption/slug',
        equalTo: slug,
      }
    })
    .map(posts => posts[0]);
  }

  deletePost(post) {
    this.eventService.addEvent('postDeleting');
    this.eventService.emitEvent('postDeleting',true)
    let updates = {};
    if(post.postMark.isPublished) updates['/posts/' + post.uid] = null
    else updates['/draft-posts/' + post.uid] = null
    if(post.postOption.image.name) this.adminFileService.deleteImage('/posts/'+post.postOption.image.name+'.'+post.postOption.image.type)
    .then(() => {
      return this.db.object('/').update(updates)
      .then(() => {
        this.snackBarService.openSnackBar("Đã xóa bài viết và ảnh thành công!");
        this.eventService.emitEvent('postDeleting',false);
      })
      .catch((e) => {
        this.eventService.emitEvent('postDeleting',false);
        if(e.message == 'PERMISSION_DENIED: Permission denied')
          this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",7000)
        else 
          this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",7000);
      })
    }).catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",7000));
    else {
    return this.db.object('/').update(updates)
    .then(() => {
      this.snackBarService.openSnackBar("Đã xóa bài viết không có ảnh thành công!");
      this.eventService.emitEvent('postDeleting',false);
    })
    .catch((e) => {
      this.eventService.emitEvent('postDeleting',false);
      if(e.message == 'PERMISSION_DENIED: Permission denied')
        this.snackBarService.openSnackBar("Lỗi: Bạn không có quyền ghi vào dữ liệu của người khác","Đóng",7000)
      else 
        this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",7000);
    })
    }
   
  }



  pinPost(post,value) {
    let updates = {};
    updates['/posts/' + post.uid +'/postMark/isFeatured'] = value;
    updates['/posts/' + post.uid +'/postMark/featureType'] = null;
    if(value) updates['/posts/' + post.uid +'/postMark/featureType'] = post.postOption.category;
    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã đánh dấu!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",3000))
  }

  homePost(post, value) {
    let updates = {};
    updates['/posts/' + post.uid +'/postMark/isHome'] = value;
    console.log("profile",updates)
    let updatePromise = this.db.object('/').update(updates);
    return updatePromise
    .then(() => {
      this.snackBarService.openSnackBar("Đã gắn vào trang chủ!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e.message,"Đóng",3000))
  }

  getCustomPosts(orderByChild?,equalTo?,limitToFirst?) {
    this.eventService.addEvent('listLoading',true);
    return this.db.list('/posts', {
        query : {
          orderByChild: null || orderByChild,
          equalTo: null || equalTo,
          limitToFirst: null || limitToFirst
        }
    }).map(posts => posts.reverse()).do(() => this.eventService.emitEvent('listLoading',false))
  }

  getDraftPosts() {
    this.eventService.addEvent('listLoading',true);
    return this.db.list('/draft-posts').map(posts => posts.reverse()).do(() => this.eventService.emitEvent('listLoading',false))
  }

}
