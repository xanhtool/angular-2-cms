import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../admin-core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: firebase.User;
  profileForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
  ) {
   
   }

  ngOnInit() {
    this.initForm();
    this.setForm();
  }

  initForm(){
    this.profileForm = this.fb.group({
      displayName:'',
      image:{
        name:'',
        url:''
      },
      email:''
    })
  }

  setForm() {
     this.authService.user.subscribe(user => {
      this.user = user;
      this.profileForm.patchValue({
        displayName:user.displayName,
        image:{url:user.photoURL},
        email:user.email
      })
    })
  }

  updatePhoto(event) { // #1: storage
    this.authService.updatePhoto(this.user,this.profileForm.value.displayName,event.url)
  }

  updateName() {
    this.authService.updateDisplayName(this.user,this.profileForm.value.displayName,this.profileForm.value.image.url)
  }

  updateEmail() {
    this.authService.updateEmail(this.user,this.profileForm.value.email)
  }

}
