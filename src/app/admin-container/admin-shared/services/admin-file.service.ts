import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminFileService {
  storageRef:any;
  loadPercent: BehaviorSubject<any> = new BehaviorSubject(0);
  constructor(private firebaseApp: FirebaseApp) {
    this.storageRef = this.firebaseApp.storage().ref();
    
    }

  deleteImage(imageName,source?) {
    let path = 'images'+'/'+imageName
    if (source) path = 'images'+source+imageName
    let imageRef = this.storageRef.child(path);
    return imageRef.delete()
  }

  uploadImage(image,source?) {
    let path = 'images'+'/'+image.name
    if (source) path = 'images'+source+image.name
    let imageRef = this.storageRef.child(path);
    let uploadTask = imageRef.put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
        this.loadPercent.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });
    return uploadTask;
  }

}
