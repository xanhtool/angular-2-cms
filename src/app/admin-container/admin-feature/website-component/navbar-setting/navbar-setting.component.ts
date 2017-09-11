import { FirebaseListObservable } from 'angularfire2/database';
import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-setting',
  templateUrl: './navbar-setting.component.html',
  styleUrls: ['./navbar-setting.component.css']
})
export class NavbarSettingComponent implements OnInit {
  categoryList;
  constructor(
    private adminComponentService: AdminComponentService
  ) { }

  ngOnInit() {
    this.getNavbarCategories();
  }

  getNavbarCategories() {
    this.categoryList = this.adminComponentService.getNavbarCategories().map((categories) => categories.sort((a, b) => a.order - b.order))
  }

}
