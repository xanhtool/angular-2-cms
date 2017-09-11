import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  category: string;
  constructor(
    private route: Router
  ) {
    route.events
     .filter(route=> route instanceof NavigationEnd )
     .map((e: NavigationEnd) => e.url)
     .map(url => url.split('/')[1])
     .subscribe(url=> this.category = url)
   }

  ngOnInit() {
  }

}
