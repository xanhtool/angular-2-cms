import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-feature',
  templateUrl: './request-feature.component.html',
  styleUrls: ['./request-feature.component.css']
})
export class RequestFeatureComponent implements OnInit {
  featureForm:FormGroup;
  constructor(
     private adminComponentService: AdminComponentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.featureForm = this.fb.group({
      name: '',
      description:''
    })
  }

  sendFeature() {
    this.adminComponentService.sendFeature(this.featureForm.value);
  }

}
