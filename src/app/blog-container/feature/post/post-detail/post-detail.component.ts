import { BlogPostService } from './../../../shared/services/blog-post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post:any;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {
    this.route.paramMap
    .map((params: ParamMap) => params.get('slug'))
    .subscribe(slug => {
      this.post = blogPostService.getPost(slug);
    })
   }

  ngOnInit() {
  }

}
