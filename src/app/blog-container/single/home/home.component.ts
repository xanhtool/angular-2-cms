import { BlogComponentService } from './../../shared/services/blog-component.service';
import { BlogSnackbarService } from './../../shared/services/blog-snackbar.service';
import { BlogPostService } from './../../shared/services/blog-post.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  lastestKey: string = null;
  posts:any[] = [];
  constructor(
    public blogPostService: BlogPostService,
    public blogComponentService: BlogComponentService,
    private blogSnackbarService: BlogSnackbarService
  ) {
  }

  ngOnInit() {
    this.getPostTimeline();
  }

  getPostTimeline() {
    this.blogPostService.getHomeTimelinePosts(this.lastestKey)
    .filter(posts => posts.length != 1)
     .subscribe((posts:any[]) => {
      if(posts && posts[posts.length-1]) this.lastestKey = posts[posts.length-1].uid;
      if (this.posts.length == 0) this.posts = [...posts]
      else {
        posts.shift();
        this.posts = this.posts.concat(posts);
      }
    })
  }

  fetch() {
    console.log("fetching data page",this.currentPage++)
    this.getPostTimeline();
  }

  subscribe(e,email) {
    e.preventDefault();
    this.blogComponentService.subscribe(email).then(() => this.blogSnackbarService.openSnackBar("Cảm ơn bạn đã đăng ký, vui lòng kiểm tra trong thùng rác để nhận email của chúng tôi",null,3000))
  }

}
