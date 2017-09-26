import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { Category } from './../../../admin-single/category/shared/category';
import { PostOption } from './shared/post-option';
import { AuthService } from './../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../admin-shared/services/admin-post.service';
import { SnackbarService } from './../../../admin-shared/services/snackbar.service';
import { Post } from './shared/post';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EventService } from './../../../admin-shared/services/event.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SlugPipe } from "../../../admin-shared/pipes/slug.pipe";
import { MdTextareaAutosize } from "@angular/material";
import * as Jquery from 'jquery'
declare var $:any;

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  host: {
    class:"post-new-component"
}
})


export class PostNewComponent implements OnInit {
  @ViewChild('title') title:MdTextareaAutosize;
  @ViewChild('subtitle') subtitle:MdTextareaAutosize;
  categories: Category[];
  formSended: boolean = false;
  show: boolean = false;
  slug:string;
  options;

  slugPipe = new SlugPipe();
    
  postForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public adminPostService: AdminPostService,
    public eventService:EventService,
    public route: ActivatedRoute,
    public router: Router,
    public snackBarService: SnackbarService,
    private authService: AuthService,
    private adminComponentService: AdminComponentService,
    ) {}

  ngOnInit() {
    this.initForm();
    this.setForm();
    this.addFroalaButton();
  }

  addFroalaButton() {
    $.FroalaEditor.DefineIcon('imageInfo', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageInfo', {
      title: 'Info',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        var $img: JQuery = this.image.get();
        $img.after(`<div class="imgcard"></div>`);
        var $div = $img.next().eq(0);
        let float = $img.css('float');
        let width = $img.css('width'); 
        $div.css({float,width})
        $div.append($img);
        $div.append(`<a href="" class="imgcard-button">button</a>`);
       
      }
    });

    this.options= { 
      placeholderText: 'Bạn đang nghĩ gì ?',
      toolbarButtons: ['fullscreen', 'bold', 'italic', '|', 'fontFamily', 'fontSize', 'paragraphFormat','|', 'color','align',  '|', '-', 'emoticons', 'insertLink', 'insertImage','insertVideo', 'insertFile', 'insertTable','insertHR',  '|','formatOL', 'formatUL', , 'quote','|','-', '|',  'help','html','insertHTML','imageInfo'],
      toolbarButtonsXS: ['bold', 'italic' , '|', 'imageInfo'],
      toolbarButtonsSM: ['bold', 'italic' , '|', 'imageInfo'],
      toolbarButtonsMD: ['bold', 'italic' , '|', 'imageInfo'],
      imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize','|', 'imageInfo'],
      fontFamilySelection: true,
      fontSizeSelection: true,
      paragraphFormatSelection: true,
      language: 'vi',
      tabSpaces: 4
    } 
  } 
   getCategories() {
    this.adminComponentService.getCategories()
    .do(categories => {
          let postCategory = this.postForm.get(['postOption','category']).value;
          let CategoryUrls = Object.values(categories).map(category => category.url)
          if ( !CategoryUrls.includes(postCategory)) this.postForm.get(['postOption','category']).setValue('');
    })
    .subscribe(categories => this.categories = Object.values(categories));
  }

  initForm() {
    this.postForm = this.fb.group({
      uid:'',
      authorUid: '',
      title:['', Validators.required],
      subtitle:['', Validators.required ],
      content:['', Validators.required ],
      postMark: {
        isHome: false,
        isPublished: false,
        isFeatured: false
      },
      postOption:  this.fb.group({
        image: this.fb.group({
          url:'',
          name:'',
          type:''
        }),
        date: new Date(),
        slug: '',
        tags: {
          0: ''
        },
        author: ['', Validators.required ],
        category:['',Validators.required ],
        seo: this.fb.group({
          title: '',
          description: '',
          keywords: '',
          author: '',
        })
      }),
      postInformation: this.fb.group({
        love: 0,
        share:0,
        view: 0
      })
    });
  }

  setForm() {
    this.authService.user
    .do((user) => this.postForm.get(['postOption','author']).setValue(user.displayName || user.email))
    .do((user)  => this.postForm.get('authorUid').setValue(user.uid))
    .do(() => {
      this.getCategories();
    }) // copy empty value to open save confirm
    .switchMap(() => this.route.paramMap)
    .map((params: ParamMap) => this.slug = params.get('slug'))
    .filter(slug => {
      // slug != null
      if (slug) return true // if old post, allow
      else this.postForm.get(['uid']).setValue(this.adminPostService.getNewPostKey()) // if new post set uid.
    }) 
    .switchMap((slug) => {
      if (this.router.url.includes('draft-edit')) return this.adminPostService.getPost(slug,true)
      return this.adminPostService.getPost(slug)
    })
    .filter(post => {
      if(post) return true // if have post, allow
      // else this.router.navigate(['admin','404']);
    })
    .subscribe((post) => {
      let editingPost = new Post(post);
      editingPost.postOption.date = new Date(editingPost.postOption.date);
      this.postForm.patchValue(editingPost);
      this.getCategories();
      this.resize();
    });
  }

  resize() {
    this.title.resizeToFitContent();
    this.subtitle.resizeToFitContent();
  }

  toogleToolFlower() {
    this.show = !this.show;
  }

  publish(postValue,isPublished) {
    postValue = this.makeSureSlug(postValue);
    postValue['postMark']['isPublished']= isPublished;
    if (this.postForm.status != "VALID") { // if form not ready because not valid
       this.snackBarService.openSnackBar("Bạn cần điền tất cả các mục có dấu sao *","Đóng",5000);
    } else {// if form rready
        if(!this.slug) { // if not old-post = if new post;
          // return this.adminPostService.uploadPost(this.slug,postValue,isPublished)
          this.slug = postValue.postOption.slug;
          return this.adminPostService.uploadPost(postValue,isPublished)
          .then(() => this.formSended = true)
          
        } else { // if old post
          this.slug = this.router.url.split('/')[3];
          this.slug = decodeURIComponent(this.slug) // decode URI to normal text, not code.
          // return this.adminPostService.updatePost(postValue, this.slug,newSlug) 
          let newSlug = postValue.postOption.slug;
          return this.adminPostService.updatePost(postValue,isPublished) 
          .then(() => this.formSended = true)
        }
    }

  }

  
  makeSureSlug(postValue) { 
    postValue.postOption.slug = this.slugPipe.transform(postValue.postOption.slug)
    return postValue
  }

  canDeactivate() {
    let published = this.postForm.value['postMark']['isPublished'];
    if (this.postForm.dirty || this.formSended) return true;
    if (published) return this.publish(this.postForm.getRawValue(),true).then(() => true)
    else return this.publish(this.postForm.getRawValue(),false).then(() => true);
  }
}
