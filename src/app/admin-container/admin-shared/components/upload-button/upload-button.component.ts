import { AdminFileService } from './../../services/admin-file.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css'],
  animations:[
       trigger('imageState', [
            state('0', style({
                opacity:0
            })),
            state('1',   style({
                opacity:1
            })),
            transition('0 => 1', animate('2000ms ease-in')),
            transition('1 => 0', animate('300ms ease-out'))
        ]),
        trigger('loadingState', [
            state('0', style({
                opacity:0
            })),
            state('1',   style({
                opacity:1
            })),
            transition('0 => 1', animate('300ms ease-in')),
            transition('1 => 0', animate('2000ms ease-out'))
        ]),
  ],
})

export class UploadButtonComponent implements OnInit, OnChanges {
    imageRef;
    @Input('parentForm') parentForm:FormGroup;
    @Input('imageControlValue') imageControlValue = {name:'',url:''};
    @Input('controlPlace') controlPlace: string[];
    @Input('source') source:string;
    @Output() onDone = new EventEmitter<any>();
    url:string ='';
    @ViewChild('imageInput') imageInput: ElementRef;
    imageLoaded:boolean = false;
    loading: boolean = false;
    loadedPercent:number = 0;
    constructor(private firebaseApp: FirebaseApp,private adminFileService:AdminFileService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.imageControlValue.currentValue.url) {
            this.setForm(changes.imageControlValue.currentValue)
        }
    }

    setForm(image) {
        this.imageLoaded = true;
        const storageRef = this.firebaseApp.storage().ref();
        this.imageRef = storageRef.child('images/'+image.name);
        this.url = image.url;
    }

   

    ngOnInit() {
        if(this.imageControlValue.url) {
            this.setForm(this.imageControlValue)
        }
    }


    deleteImage() {
        // Delete the file
        this.imageRef.delete().then(() => {
            this.imageLoaded = false;
            this.updateUrl(null,null);
            this.imageInput.nativeElement.value = '';
        }).catch(err => {
            console.error('error coming!!!',err);
            this.imageLoaded = true;
        }
        );
    }

    updateUrl(name,url) {
        this.url =url;
        this.parentForm.get(this.controlPlace).patchValue({url,name})
    }

    uploadImage(file) {
        // this.imageRef = storageRef.child('images/'+fileName);
        // //Upload
        // let uploadTask = this.imageRef.put(file);
        // //Set Url after uploaded
        // uploadTask
        // // watch
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
        //     this.loading= true;
        //     this.loadedPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     if (this.loadedPercent == 100) this.loading= false;
        // });
        this.loadedPercent = 0; // reset loadPercent
        const storageRef = this.firebaseApp.storage().ref();
        const fileName = new Date().getTime()+ file.name;

        this.adminFileService.uploadImage(file, this.source)
        .then((snapshot) => {
            this.updateUrl(fileName,snapshot.downloadURL);
            this.imageLoaded = true;
            this.onDone.emit({name:fileName,url:snapshot.downloadURL})
        })
        .catch(err => console.error('error coming!!!',err));

        this.adminFileService.loadPercent.subscribe(percent =>{
            this.loading= true;
            this.loadedPercent = percent;
            if (this.loadedPercent == 100) this.loading= false;
        })

    }


    
    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            this.uploadImage(event.target.files[0])
        }
    }

}
