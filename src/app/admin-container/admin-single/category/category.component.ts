import { Category } from './shared/category';
import { AdminComponentService } from './../../admin-shared/services/admin-component.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, PipeTransform } from '@angular/core';

import 'rxjs/add/operator/map'
import { SlugPipe } from "../../admin-shared/pipes/slug.pipe";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  slugPipe = new SlugPipe();
  categories: any;
  categoriesValue: any;
  categoriesForm: FormGroup;

  get categoriesFormArray(): FormArray {
    return this.categoriesForm.get('categoriesFormArray') as FormArray;
  };

  constructor(
    private fb: FormBuilder,
    public adminComponentService: AdminComponentService
  ) {}


  ngOnInit() {
    this.initForm();
    this.getForm();
  }

  initForm(){
    this.categoriesForm = this.fb.group({
      categoriesFormArray: this.fb.array([])
    });
  }

  getForm() {
    this.categories = this.adminComponentService.getCategories();
    this.categories
    .map((categories) => this.categoriesValue = categories)
    .subscribe((categories) => this.setCategories(categories)) // set database values
    
  }
 

  setCategories(categories:Category[]) {
    const categoryFormGroupList = categories.map(category => this.fb.group(category)); // convert Object list to Form Group List
    let databaseFormArray = this.fb.array(categoryFormGroupList); // transfer to an Form Array
    this.categoriesForm.setControl('categoriesFormArray', databaseFormArray); // reset new Form Array value to quoteFormArray
  }

  addCategory() {
    this.adminComponentService.addCategory(new Category({name:'',url:'',onNavbar: false, description: ''}));
  }

  updateCategory(index,data:Category) {
    let key = this.categoriesValue[index].$key
    data.url = data.url.toLowerCase();
    this.adminComponentService.updateCategory(key,data);
  }

  slideChange(event,i, value) {
    value.onNavbar = event.checked;
    this.updateCategory(i,value)
  }

  deleteCategory(index) {
    let key = this.categoriesValue[index].$key
    this.adminComponentService.deleteCategory(key);
  }

  onDrop(src: Category, trg: Category) {
    this.moveItem(src,trg);
  }
  
  // list mode
  moveItem(src, trg) {
    let categories:Category[] = this.categoriesFormArray.value;
    let fromIndex = categories.indexOf(src);
    let toIndex = categories.indexOf(trg);
    let update = {};
    update['/categories/'+this.categoriesValue[fromIndex].$key] = trg;
    update['/categories/'+this.categoriesValue[toIndex].$key] = src;
    this.adminComponentService.swapCategory(update);
  }


}
