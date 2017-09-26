import { SnackbarService } from './../../../../../admin-shared/services/snackbar.service';
import { Category } from './../../../../../admin-single/category/shared/category';
import { PostOption } from './../post-option';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { SlugPipe } from "../../../../../admin-shared/pipes/slug.pipe";

@Component({
  selector: 'app-sidenav-post-option',
  templateUrl: './sidenav-post-option.component.html',
  styleUrls: ['./sidenav-post-option.component.css'],
  animations: [
  trigger('postOptionState', [
    state('0', style({
    })),
    state('1',   style({
      transform: "translateX(-400px)"
    })),
    transition('0 => 1', animate('500ms ease-in')),
    transition('1 => 0', animate('500ms ease-out'))
  ]),
   trigger('seoState', [
    state('0', style({
    })),
    state('1',   style({
      color:"#1a237e",
      transform: "translateX(-450px)"
    })),
    transition('0 => 1', animate('500ms ease-in')),
    transition('1 => 0', animate('500ms ease-out'))
  ])
]
})

export class SidenavPostOptionComponent implements OnInit,OnChanges {

  @Input() parentForm:FormGroup;

  slugPipe = new SlugPipe();
  author: any;
  postOptionForm:FormGroup;
  seoOpened:boolean = false;
  authors = ['Quyền Anh','author1', 'author2', 'author3',];
  
  selectedAuthor = this.authors[0];
  isDisableToogle = true;
  categoryFeatureToogle:boolean = false;

  constructor(
    private fb: FormBuilder, 
    
    private snackbarService: SnackbarService
  ) {
   }


  ngOnInit() {
    if(this.parentForm) {
        this.transformSlug();
      this.copyControlValue(['title'],['postOption','seo','title']);
      this.copyControlValue(['subtitle'],['postOption','seo','description']);
      this.copyControlValue(['postOption','tags'],['postOption','seo','keywords']);
      this.copyControlValue(['postOption','author'],['postOption','seo','author']);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes)
  }

  // watchFeatureToogle() {
  //   this.parentForm.get(['postOption','categoryFeature']).valueChanges
  //   .subscribe(value => {
  //     console.warn('categoryFeature value change',value)
  //     if (value) this.categoryFeatureToogle = true;
  //     else this.categoryFeatureToogle = false;
  //   })
  // }

  // categoryFeatureToogleChange(toogled) {
  //     if (toogled.checked) this.parentForm.get(['postOption','categoryFeature']).setValue(this.parentForm.get(['postOption','category']).value)
  //     else this.parentForm.get(['postOption','categoryFeature']).setValue(null)
  // }

  // toogleWarn() {
  //   if (this.isDisableToogle) this.snackbarService.openSnackBar("Tính năng chọn bài viết nổi bật chỉ kích hoạt khi bạn chọn xong danh mục","Đóng",3000)
  // }

  toogleSEO() {this.seoOpened = !this.seoOpened}

  transformSlug() {
    let titleControl = this.parentForm.get(['title'])
    titleControl.valueChanges.forEach((title) => {
      let slugControl = this.parentForm.get(['postOption','slug']);
      slugControl.setValue(this.slugPipe.transform(title))
    })
  }

  

  copyControlValue(from,to) {
    let fromControl = this.parentForm.get(from)
    fromControl.valueChanges.forEach((value) => {
       let toControl = this.parentForm.get(to);
       if(value instanceof Object) { // if value is Array like keywords
         value = Object.keys(value).map(key => value[key])
       }
       toControl.setValue(value.toString());
       
    })
  }

  updatePhoto(event) {
    this.parentForm.get(['postOption','image']).setValue(event);
  }

}
