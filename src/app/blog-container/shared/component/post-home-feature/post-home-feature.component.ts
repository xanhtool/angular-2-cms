import { BlogPostService } from './../../services/blog-post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-home-feature',
  templateUrl: './post-home-feature.component.html',
  styleUrls: ['./post-home-feature.component.css']
})
export class PostHomeFeatureComponent implements OnInit {
  homeFeaturePosts:any;
  constructor(
    public blogPostService: BlogPostService
  ) {
    this.homeFeaturePosts = blogPostService.getHomeFeaturePosts();
   }

  ngOnInit() {
  }

}
