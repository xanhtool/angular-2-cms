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

  deleteImage(path) {
    let imageRef = this.storageRef.child('images/'+path);
    return imageRef.delete()
  }

  uploadImage(file,source,name="image") {
    let typeExtension = file.name.split('.')[file.name.split('.').length -1]
    let path = 'images/'+source+'/'+name+'.'+typeExtension
    let metadata = {
      contentType: file.type,
      name: name
    };
    let imageRef = this.storageRef.child(path);
    let uploadTask = imageRef.put(file,metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
        this.loadPercent.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });
    return uploadTask;
  }

  updateMeta(metaData) {
    
  }

}
