import { BlogPostService } from './../../shared/services/blog-post.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postList: any;
  currentPage: number = 1;

  constructor(public blogPostService: BlogPostService) {
  }

  ngOnInit() {
    this.getPostTimeline(this.currentPage);
  }

  getPostTimeline(n) {
    this.postList = this.blogPostService.getHomeTimelinePost(n).map((posts:any[]) => posts.reverse());
  }

  fetch(e) {
    console.log("fetching data page",this.currentPage++)
    this.getPostTimeline(this.currentPage++);
  }

}
