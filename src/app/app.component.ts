import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  globalTitle: string;
  bannerful:boolean = false;
  item: FirebaseObjectObservable<any>;

  public constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute, 
    public db: AngularFireDatabase
  ) { 
      this.getGlobalSetting();
   }


  ngOnInit() {
    this.setBannerSize();
    this.setTitleOnRoute()    
  }

  setBannerSize() {
    this.router.events.filter(event => event instanceof NavigationStart)
    .do(() => this.bannerful = false) // set default value false
    .filter((event:NavigationStart) => event.url == "/") // if home page
    .subscribe((val) => this.bannerful = true) // set value to true
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  public setTags(tags) {
    let arrayTags = Object.keys(tags).map(tagKey => {
      let tagValue = tags[tagKey];
      let tagObject = {};
      tagObject[tagKey] = tagValue;
      return tagObject
    })
    this.metaService.addTags(arrayTags);
  }

  getGlobalSetting() {
    this.item = this.db.object('/web-setting');
    this.item.subscribe(setting => {
      this.globalTitle = setting.titleTag;
      if (this.globalTitle) this.setTitle(this.globalTitle); // default title!!!
      if (setting.metaTags) this.setTags(setting.metaTags);
      
    })
  }


  setTitleOnRoute() {
    // SET TITLE BY ROUTING
    this.router.events.filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
     .map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      // if have title in router, set it. if not, set default;
      if (event['title']) this.titleService.setTitle(event['title'])
      else {
        this.setTitle(this.globalTitle); // default title!!!
      } 
    })
  }
}
