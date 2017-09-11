import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { Category } from './../../../admin-single/category/shared/category';
import { PostOption } from './shared/post-option';
import { AuthService } from './../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../admin-shared/services/admin-post.service';
import { SnackbarService } from './../../../admin-shared/services/snackbar.service';
import { Post } from './shared/post';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EventService } from './../../../admin-shared/services/event.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SlugPipe } from "../../../admin-shared/pipes/slug.pipe";
import { MdTextareaAutosize } from "@angular/material";


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
  postSendValue: any;
  categories: Category[];
  formSended: boolean = false;
  show: boolean = false;
  slug:string;
  options: Object = { 
    placeholderText: 'Bạn đang nghĩ gì ?',
    toolbarButtons: ['fullscreen', 'bold', 'italic', '|', 'fontFamily', 'fontSize', 'paragraphFormat','|', 'color','align',  '|', '-', 'emoticons', 'insertLink', 'insertImage','insertVideo', 'insertFile', 'insertTable','insertHR',  '|','formatOL', 'formatUL', , 'quote','|','-', '|',  'help',],
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    language: 'vi'
  } 

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
          name:''
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
      postInfomation: this.fb.group({
        love: '',
        share:'',
        comment: ''
      })
    });
  }

  setForm() {
    this.authService.user
    .do((user) => this.postForm.get(['postOption','author']).setValue(user.displayName || user.email))
    .do((user)  => this.postForm.get('authorUid').setValue(user.uid))
    .switchMap(() => this.route.paramMap)
    .map((params: ParamMap) => this.slug = params.get('slug'))
    .do(() => {
      this.postSendValue = this.postForm.getRawValue()
    }) // copy empty value to open save confirm
    .filter(slug => slug != null) // if this is not a new post
    .switchMap((slug) => this.adminPostService.getPost(slug))
    .subscribe((post) => {
      let editingPost = new Post(post);
      editingPost.postOption.date = new Date(editingPost.postOption.date);
      this.postForm.patchValue(editingPost);
      this.postSendValue = this.postForm.getRawValue();
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
          this.slug = postValue.postOption.slug;
          this.postSendValue = postValue;
          return this.adminPostService.uploadPost(this.slug,postValue,isPublished)
          .then(() => this.formSended = true)
          .then(() =>this.router.navigate(['admin','post-edit',this.slug]))
        } else { // if old post
          this.slug = this.router.url.split('/')[3];
          this.slug = decodeURIComponent(this.slug) // decode URI to normal text, not code.
          let newSlug = postValue.postOption.slug;
          
          this.postSendValue = postValue;
          return this.adminPostService.updatePost(postValue, this.slug,newSlug) 
          .then(() => this.formSended = true)
          .then(() =>this.router.navigate(['admin','post-edit',newSlug]))
        }
    }

  }

  saveDraft(postValue,isPublished) {
    postValue = this.makeSureSlug(postValue);
    postValue['postMark']['isPublished'] = isPublished;
    if (this.postForm.status != "VALID") {
       this.snackBarService.openSnackBar(`Bạn cần điền đầy đủ "thông tin bắt buộc" trước khi lưu.Thông tin bắt buộc có thể tìm thấy ở "Hoa công cụ".`,"Đóng",5000);
    } else {
      if(!this.slug) {
        this.slug = postValue.postOption.slug;
      }
      this.postSendValue = postValue;
      return this.adminPostService.uploadPost(this.slug,postValue,isPublished)
      .then(() => this.formSended = true);
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
    else return this.saveDraft(this.postForm.getRawValue(),false).then(() => true);
    // if () this.publish(this.postForm.getRawValue(),true)
    // else if (this.drafting) this.saveDraft(this.postForm.getRawValue(),false)
    // else this.saveDraft(this.postForm.getRawValue(),false);
    // if (this.postForm.status != "VALID" && ) {
    //    return false;
    // } else {
    //   return true;
    // }
  }
}
