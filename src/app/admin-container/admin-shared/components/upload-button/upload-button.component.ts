import { AdminFileService } from './../../services/admin-file.service';
import { FormGroup } from '@angular/forms';
import { Component,ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
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

export class UploadButtonComponent implements  OnChanges {
    @ViewChild('imageInput') imageInput: ElementRef;
    @Output() onDone = new EventEmitter<any>();
    @Input('imageLastValue') imageValue = {name:'',url:'',type:''};
    @Input('source') source:string = 'forget';
    @Input('imageName') name: string;
    imageLoaded:boolean = false;
    loading: boolean = false;
    loadedPercent:number = 0;

    constructor(private firebaseApp: FirebaseApp,private adminFileService:AdminFileService) {}

    ngOnChanges(changes: SimpleChanges) {
        if(changes.imageValue && changes.imageValue.currentValue.url) {
            this.imageLoaded = true;
        }
    }

    deleteImage() {
        // Delete the file
        this.adminFileService.deleteImage(this.source+'/'+this.name+'.'+this.imageValue.type).then(() => {
            this.imageLoaded = false;
            this.onDone.emit({name:null,url:null,type:null})
            this.imageInput.nativeElement.value = '';
        }).catch(err => {
            this.imageLoaded = true;
        }
        );
    }

    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            this.uploadImage(event.target.files[0])
        }
    }

    uploadImage(file) {
        this.loadedPercent = 0; // reset loadPercent
        this.adminFileService.uploadImage(file,this.source,this.name)
        .then((snapshot) => {
            this.imageLoaded = true;
            let fullname = snapshot.metadata.name.split('.')
            this.onDone.emit({name:fullname[0],url:snapshot.downloadURL,type:fullname[1]})
        })
        .catch(err => console.error('error coming!!!',err));

        this.adminFileService.loadPercent.subscribe(percent =>{
            this.loading= true;
            this.loadedPercent = percent;
            if (this.loadedPercent == 100) this.loading= false;
        })

    }
    


    


}
