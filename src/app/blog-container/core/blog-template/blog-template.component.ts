import { BlogAuthService } from './../services/blog-auth.service';
import { BlogComponentService } from './../../shared/services/blog-component.service';
import { BlogFileService } from './../../shared/services/blog-file.service';
import { Router, NavigationEnd  } from '@angular/router';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
  
@Component({
  selector: 'app-blog-template',
  templateUrl: './blog-template.component.html',
  styleUrls: ['./blog-template.component.css','./../../../../assets/css/style.css']
})
export class BlogTemplateComponent implements OnInit {
  fileImage: any;
  bannerful: boolean = false;
  isEditting: boolean = false;
  displaySave: boolean = false;
  loading:boolean = false;
  isDragging: boolean = false;
  banner:{url:string,name:string,top:number};
  severBanner:{url:string,name:string,top:number};
  @ViewChild('imageBanner') imageBanner:ElementRef;
  constructor(
    private route: Router,
    private blogFileService: BlogFileService,
    private blogComponentService: BlogComponentService, 
    private renderer2: Renderer2,
    public sanitizer: DomSanitizer,
    public blogAuthService: BlogAuthService
  ) {
     route.events
     .filter(route=> route instanceof NavigationEnd )
     .map((e: NavigationEnd) => e.url)
     .do(() => this.bannerful = false)
     .filter(url => url == "/")
     .subscribe(url=> {
       this.bannerful = true;
     })
   }

  ngOnInit() {
    this.getBanner()
  }

  getBanner() {
    this.blogComponentService.getBanner()
    .do((banner) => this.severBanner = banner)
    .subscribe(banner => this.banner = banner);
  }

  readFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.uploadTemplateBanner(event.target.files[0]);
      this.editting(true)
    }
  }

  uploadTemplateBanner(file) {
    this.fileImage = file;
    // upload current image file to storage
    this.loading = true;
    this.blogFileService.uploadImage(file,'/home/','template-banner')
    .then((snapshot) => {
      this.loading = false;
      this.banner.url = snapshot.downloadURL;
      this.banner.name = 'template-banner';
    })
    .catch(err => console.error('error coming!!!',err));
       

    }

  editting(value) {
    this.isDragging = value;
    this.isEditting = value;
  }

  cancelEditBanner() {
    this.editting(false);
    this.banner = this.severBanner; // rollback to server banner
  }

  saveBanner() {
    if(this.isDragging) {
      this.banner.top = this.imageBanner.nativeElement.style['top'];
        this.blogComponentService.saveBanner(this.banner)
    } else {
      this.loading = true;
      this.blogFileService.uploadImage(this.fileImage,'/home/','banner')
      .then((snapshot) => {
        this.loading = false;
        this.banner.url = snapshot.downloadURL;
        this.banner.name = 'banner';
        this.banner.top = this.imageBanner.nativeElement.style['top'];
        this.blogComponentService.saveBanner(this.banner)
      })
      .catch(err => console.error('error coming!!!',err));
    }
    
    this.editting(false);
  
    // upload current image file to storage
    // set database banner to new banner (using this backgroundUrl to be url,snapshot to it name, and save position )

  }

}
