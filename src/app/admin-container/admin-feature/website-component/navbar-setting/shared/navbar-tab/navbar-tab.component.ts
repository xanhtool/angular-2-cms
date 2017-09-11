import { AdminComponentService } from './../../../../../admin-shared/services/admin-component.service';
import { Link } from './../link';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar-tab',
  templateUrl: './navbar-tab.component.html',
  styleUrls: ['./navbar-tab.component.css']
})
export class NavbarTabComponent implements OnInit {
  @Input() category;
  settingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminComponentService: AdminComponentService
  ) { }

  ngOnInit() {
    this.initForm();
    this.updateForm();
  }


  initForm() {
    this.settingForm  = this.fb.group(this.category)  
  }

  updateForm() {
   
  }

  


  saveForm() {
    this.adminComponentService.updateCategory(this.category.$key,this.settingForm.value)
  }



}
