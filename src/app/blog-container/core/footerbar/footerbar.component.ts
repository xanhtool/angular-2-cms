import { BlogComponentService } from './../../shared/services/blog-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.css']
})
export class FooterbarComponent implements OnInit {
  footer: any;
  websiteName: any;
  year: number;
  constructor(
    public blogComponentService:BlogComponentService
  ) {
    this.footer= blogComponentService.getFooter()
    this.year = new Date().getFullYear();
    this.websiteName = blogComponentService.getWebSetting();
   }

  ngOnInit() {
  }

}
