import { BlogPostService } from './../../../shared/services/blog-post.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  lastestKey:any;
  category: string;
  posts:any[]=[];
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
       this.getCategoryPosts();
     })
  }

  getCategoryPosts() {
    this.blogPostService.getPageCategoryPosts(this.category,this.lastestKey).filter(posts => posts.length != 1)
    .subscribe((posts:any[]) => {
      if(posts && posts[posts.length-1]) this.lastestKey = posts[posts.length-1].uid;
      if (this.posts.length == 0) this.posts = [...posts]
      else {
        posts.shift();
        this.posts = this.posts.concat(posts);
      }
    })
  }

  ngOnInit() {
  }


  fetch(e) {
    this.getCategoryPosts();
  }

}
