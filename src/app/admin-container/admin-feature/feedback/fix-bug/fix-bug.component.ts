import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../admin-core/services/auth.service';
import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-bug',
  templateUrl: './fix-bug.component.html',
  styleUrls: ['./fix-bug.component.css']
})
export class FixBugComponent implements OnInit {
  bugForm: any;
  username;
  constructor(
    private adminComponentService: AdminComponentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authService.user.subscribe(user => this.username = user.displayName || user.email)
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bugForm = this.fb.group({
      place:'',
      how:'',
      step:'',
      expect:''
    })
  }

  sendBug(){
    this.adminComponentService.sendBug(this.bugForm.value);
  }

}
