import { BlogAuthService } from './../services/blog-auth.service';
import { Observable } from 'rxjs/Observable';
import { BlogPostService } from './../../shared/services/blog-post.service';
import { BlogComponentService } from './../../shared/services/blog-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  expandDropdown = false;  
  // mmo:any;
  categoryList:any[];
  constructor(
    public blogAuthService: BlogAuthService,
    public blogComponentService: BlogComponentService,
    public blogPostService: BlogPostService
  ) {
    
  }

  ngOnInit() {
    this.blogComponentService.getNavbarCategories().subscribe(categories => {
      this.categoryList = categories;
      Object.values(categories).map(category =>this.getCategoryData(category))
    })
    
  }

  getCategoryData(category) {
    this.blogPostService.getCategoryPosts(category.url,5).subscribe(posts => category['lastestPost'] = posts);
    this.blogPostService.getCategoryFeaturePosts(category.url,5).subscribe(posts => category['featurePost'] = posts);
  }

}
