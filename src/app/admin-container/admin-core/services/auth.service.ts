import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { SnackbarService } from './../../admin-shared/services/snackbar.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";


@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private snackbarService: SnackbarService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = afAuth.authState;

    // afAuth.auth.onAuthStateChanged((auth) => {
    //   if (auth) {
    //     localStorage.setItem('auth', JSON.stringify(auth));
    //   }
    // })
   }

  login(email,password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then(() => this.router.navigate(['/admin/dashboard']));
  }

  loginFB() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => this.router.navigate(['/admin/dashboard']));
  }

  loginGG() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.afAuth.auth.signInWithPopup(provider).then(() => this.router.navigate(['/admin/dashboard']));
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('auth');
      this.router.navigate(['/'])
    });
  }

  updatePhoto(user:firebase.User,displayName,image) {
    console.log('image',image)
    // #2: firebase
    user.updateProfile({
      displayName:displayName,
      photoURL:image.url
    })
    .then(() => {
      // #3:/users/
      // #2: /users/
      this.updateDatabaseUser(user.uid,null,null,image).then(() => this.snackbarService.openSnackBar("Đã cập nhật ảnh của bạn!"))
      })
      .catch((e) => this.snackbarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  updateDisplayName(user:firebase.User,displayName,photoURL) {
    //#1: firebase
    user.updateProfile({
      displayName:displayName,
      photoURL:photoURL
    })
    .then(() => {
      // #2: /users/
      this.updateDatabaseUser(user.uid,displayName,null,null).then(() => this.snackbarService.openSnackBar("Đã cập nhật tên của bạn!"))
    })
    .catch((e) => this.snackbarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
    
    // #3: /posts/
    
  }

  updateEmail(user:firebase.User,email){
      // #1: firebase
    user.updateEmail(email)
    .then(() => {
      // #2: /users/
      this.updateDatabaseUser(user.uid,null,email,null).then(() => this.snackbarService.openSnackBar("Đã cập nhật email của bạn!"))
      
    })
    .catch((e) => this.snackbarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }


  updateDatabaseUser(uid,name=null,email=null,image=null) {
    let updates = {};
    if(name)  updates['/users/' + uid +'/image'] = name;
    if(image) updates['/users/' + uid +'/image'] = image;
    if(email) updates['/users/' + uid +'/image'] = email;
    return this.db.object('/').update(updates)
  }


  getDatabaseUser(userUid) {
    return this.db.object('/users/'+userUid);
  }


}
