import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-setting',
  templateUrl: './footer-setting.component.html',
  styleUrls: ['./footer-setting.component.css']
})
export class FooterSettingComponent implements OnInit {
  footerFormSendValue: any = {
    url:'',
    aboutAuthor: '',
    aboutWebsite: ''
  };

  footerForm: FormGroup;
  froalaOptions:Object = { 
    placeholderText: 'Điền nội dung ở đây!',
    toolbarButtons: ['fullscreen', 'bold', 'italic', '|', 'fontFamily', 'fontSize', 'paragraphFormat','|', 'color','align',  '|', '-', 'emoticons', 'insertLink', 'insertImage','insertVideo','insertHR',  '|','formatOL', 'formatUL', , 'quote','|','-', '|',  'help',],
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    language: 'vi'
  } 
    
  constructor(
    private fb: FormBuilder,
    private adminComponentService: AdminComponentService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setFooter();
    
  }

  initForm() {
    this.footerForm = this.fb.group({
      image:this.fb.group({
        url: '',
        name:'',
        type:''
      }),
      aboutAuthor: '',
      aboutWebsite: ''
    })
  }

  setFooter() {
    this.adminComponentService.getFooter().subscribe(setting => {
      this.footerForm.patchValue(setting)
      this.footerFormSendValue = this.footerForm.value;
    });
  }

  updatePhoto(event) {
    this.footerForm.get(['image']).setValue(event)
  }

  saveFooter() {
    this.footerFormSendValue = this.footerForm.value;
    this.adminComponentService.updateFooter(this.footerForm.value);
  }

  canDeactivate() {
    if (JSON.stringify(this.footerFormSendValue) != JSON.stringify(this.footerForm.value)) {
      return confirm('Không lưu?')
    }
    return true;
  }

}
