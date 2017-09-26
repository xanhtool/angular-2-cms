import { Faq } from './shared/faq';
import { AdminComponentService } from './../../admin-shared/services/admin-component.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faq: any;
  faqValue :any;
  
  faqForm: FormGroup;

  get faqFormArray(): FormArray {
    return this.faqForm.get('faqFormArray') as FormArray;
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
    this.faqForm = this.fb.group({
      faqFormArray: this.fb.array([])
    });
  }

  getForm() {
    this.faq = this.adminComponentService.getFaq()
    this.faq.subscribe((questions) => this.setFaq(questions)) // set database values
    
  }
 

  setFaq(questions:Faq[]) {
    this.faqValue = questions;
    const faqFormGroupList = questions.map(value => this.fb.group(value)); // convert Object list to Form Group List
    let databaseFormArray = this.fb.array(faqFormGroupList); // transfer to an Form Array
    this.faqForm.setControl('faqFormArray', databaseFormArray); // reset new Form Array value to quoteFormArray
  }

  addFaq() {
    this.adminComponentService.addFaq(new Faq({question:'',answer:''}))
  }

  updateFaq(i, value) {
    let key = this.faqValue[i].$key
    this.adminComponentService.updateFaq(key,value)
  }

  deleteFaq(i) {
    this.adminComponentService.deleteFaq(this.faqValue[i].$key)
  }

  onDrop(src: Faq, trg: Faq) {
    this.moveItem(src,trg);
  }
  
  //list mode
  moveItem(src, trg) {
    let faq:Faq[] = this.faqFormArray.value;
    let fromIndex = faq.indexOf(src);
    let toIndex = faq.indexOf(trg);
    let update = {};
    update['/faq/'+this.faqValue[fromIndex].$key] = trg;
    update['/faq/'+this.faqValue[toIndex].$key] = src;
    this.adminComponentService.swapFaq(update)
  }

}
