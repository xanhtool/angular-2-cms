import { Observable } from 'rxjs/Observable';
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
  recentPosts:any;
  mostViewPosts:any;
  categories: FirebaseListObservable<any[]>;
  faq: FirebaseListObservable<any[]>;
  constructor(
    private blogComponentService: BlogComponentService,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit() {
    this.getAdmin();
    this.getRecentPosts();
    this.getMostViewPost();
    this.getCategories();
    this.getFaq();
  }

  getAdmin() {
    this.admin = this.blogComponentService.getFooter();
  }

  getRecentPosts() {
    this.recentPosts = this.blogPostService.getRecentPosts(3);
  }

  getMostViewPost() {
    this.mostViewPosts = this.blogPostService.getMostViewPosts(3);
  }

  getCategories() {
    this.categories = this.blogComponentService.getCategories();
  }

  getFaq() {
    this.faq = this.blogComponentService.getFaq();
  }
}
