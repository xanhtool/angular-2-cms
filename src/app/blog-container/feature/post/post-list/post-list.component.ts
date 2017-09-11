import { BlogPostService } from './../../../shared/services/blog-post.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  category: string;
  categoryPost:any;
  currentPage: number = 1;

  constructor(
    private route: Router,
    private blogPostService: BlogPostService
  ) {
    this.getCurrentCategory();
  }


  
  getCurrentCategory() {
    this.route.events
     .filter(route=> route instanceof NavigationEnd )
     .map((e: NavigationEnd) => e.url)
     .map(url => url.split('/')[1])
     .subscribe(category=> {
       this.category = category;
       this.getCategoryPost(this.currentPage);
     })
  }

  getCategoryPost(page) {
    this.categoryPost = this.blogPostService.getCategoryPost(this.category,page).map((posts:any[]) => posts.reverse());
  }

  ngOnInit() {
  }


  fetch(e) {
    console.log("fetching data page",this.currentPage++)
    this.getCategoryPost(this.currentPage++);
  }

}
