import { AdminComponentService } from './../../admin-shared/services/admin-component.service';
import { WebSetting } from './../../admin-shared/models/web-setting';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-setting-website',
  templateUrl: './setting-website.component.html',
  styleUrls: ['./setting-website.component.css']
})
export class SettingWebsiteComponent implements OnInit {
  settingForm: FormGroup;
  settingValue: WebSetting;
  informationCard: any;


  constructor(
    private fb: FormBuilder,
    public adminComponentService: AdminComponentService
  ) {
   }

  ngOnInit() {
    this.initForm();
    this.setForm();
  }

  initForm() {
    this.settingForm = this.fb.group({
      titleTag: '',
      slogan: '',
      contact: '',
      metaTags: this.fb.group({
        title: '',
        description: '',
        keywords: '',
        author: '',
      })
    });
    
  }

  setForm() {
    this.adminComponentService.getSetting().subscribe(setting => {
      this.settingValue = setting;
      this.informationCard = this.settingValue['information']['default'];
      this.settingForm.patchValue(setting);
    })
  }

  sendSetting() {
    this.settingForm.controls.titleTag.setValue(this.settingForm.get(['metaTags','title']).value)
    this.adminComponentService.updateSetting(this.settingForm.value)
  }

  triggerInformationCard(tagName) {
    this.informationCard = this.settingValue['information'][tagName];
  }

}
