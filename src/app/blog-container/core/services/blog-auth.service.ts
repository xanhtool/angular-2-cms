import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class BlogAuthService {

  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.user = afAuth.authState;
  }

}
