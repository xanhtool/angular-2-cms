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
    this.authService.user.subscribe(user => this.user = user);
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
        url:'',
        type:''
      },
      email:''
    })
  }

  setForm() {
     this.authService.getDatabaseUser(this.user.uid).subscribe(user => {
      this.profileForm.patchValue(user);
    })
  }

  updatePhoto(event) { // #1: storage
    this.authService.updatePhoto(this.user,this.profileForm.value.displayName,event)
  }

  updateName() {
    this.authService.updateDisplayName(this.user,this.profileForm.value.displayName,this.profileForm.value.image.url)
  }

  updateEmail() {
    this.authService.updateEmail(this.user,this.profileForm.value.email)
  }

}
