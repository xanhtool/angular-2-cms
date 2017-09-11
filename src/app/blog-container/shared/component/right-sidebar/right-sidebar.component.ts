import { BlogPostService } from './../../services/blog-post.service';
import { BlogComponentService } from './../../services/blog-component.service';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  admin: FirebaseObjectObservable<any>;
  recentPost: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;
  faq: FirebaseListObservable<any[]>;
  constructor(
    private blogComponentService: BlogComponentService,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit() {
    this.getAdmin();
    this.getRecentPost();
    this.getCategories();
    this.getFaq();
  }


  getAdmin() {
    this.admin = this.blogComponentService.getFooter();
  }

  getRecentPost() {
    this.recentPost = this.blogPostService.getRecentPost(3);
  }

  getCategories() {
    this.categories = this.blogComponentService.getCategories();
  }

  getFaq() {
    this.faq = this.blogComponentService.getFaq();
  }
}
