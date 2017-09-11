import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase/app';

@Injectable()
export class BlogFileService {
  storageRef:any;
  loadPercent: Subject<any>;
  constructor(private firebaseApp: FirebaseApp) {
    this.storageRef = this.firebaseApp.storage().ref();
    
    }

  deleteImage(imageName,source?) {
    let imageRef = this.storageRef.child('images'+source+'/'+imageName);
    return imageRef.delete()
  }

  uploadImage(image,source,name?) {
    let type = image.type.split('/')[1];
    let imageName = image.name; // default name
    if (name) imageName = `${name}.${type}`; // custom name
    let imageRef = this.storageRef.child('images'+source+imageName);
    let uploadTask = imageRef.put(image);
    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
    //     this.loadPercent.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    // });
    return uploadTask;
  }
}
