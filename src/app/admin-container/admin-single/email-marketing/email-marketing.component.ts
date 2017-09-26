import { SnackbarService } from './../../admin-shared/services/snackbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminEmailService } from './../../admin-shared/services/admin-email.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-marketing',
  templateUrl: './email-marketing.component.html',
  styleUrls: ['./email-marketing.component.css']
})
export class EmailMarketingComponent implements OnInit {
  templates: any;
  campainForm: FormGroup;
  loading = false;

  constructor(
    private adminEmailService: AdminEmailService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getTemplates();
  }

  initForm() {
    this.campainForm = this.fb.group({
      templateID:'',
      campainID: ''
    })
  }

  getTemplates() {
    this.templates = this.adminEmailService.getTemplates()
  }

  sendCampain() {
    this.loading = true;
    this.adminEmailService.sendCampain(this.campainForm.value).subscribe((result:any) => {
      console.log('kết quả chiến dịch',result);
      this.loading = false;
      let snackbarRef = this.snackbar.openSnackBar(`Gửi mail thành công! Đã nhận ${result.data.total_accepted_recipients}, từ chối ${result.data.total_rejected_recipients}`,"Xem chi tiết",10000)
      snackbarRef.onAction().subscribe(() => window.open('https://app.sparkpost.com/reports/summary', '_blank'))
    }, (err) => {
      this.snackbar.openSnackBar("Lỗi! Vui lòng check console.log","",7000);
      this.loading = false;
    })
  }


}
