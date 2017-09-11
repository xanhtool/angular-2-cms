import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { Quote } from './quote';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slider-setting',
  templateUrl: './slider-setting.component.html',
  styleUrls: ['./slider-setting.component.css']
})
export class SliderSettingComponent implements OnInit {
  quotes: any;
  quoteForm: FormGroup;
  quotesValue: any;

  get quoteFormArray(): FormArray {
    return this.quoteForm.get('quoteFormArray') as FormArray;
  };

  constructor(
    private fb: FormBuilder,
    public adminComponentService: AdminComponentService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getForm();

    
  }

  initForm() {
    this.quoteForm = this.fb.group({
      quoteFormArray: this.fb.array([])
    });
  }

  getForm() {
    this.quotes = this.adminComponentService.getQuote()
    this.quotes
    .map(quotes => this.quotesValue = quotes)
    .subscribe(quotes => this.setQuotes(quotes)) // set database values
  }

  setQuotes(quotes:Quote[]) {
    const quoteFormGroupList = quotes.map(quote => this.fb.group(quote)); // convert Object list to Form Group List
    let databaseFormArray = this.fb.array(quoteFormGroupList); // transfer to an Form Array
     this.quoteForm.setControl('quoteFormArray', databaseFormArray); // reset new Form Array value to quoteFormArray
  }

  addQuote() {
    this.adminComponentService.addQuote(new Quote({author:'',content:''}))
  }

  updateQuote(index,data) {
    let key = this.quotesValue[index].$key
    this.adminComponentService.updateQuote(key, data)
  }

  deleteQuote(index) {
    let key = this.quotesValue[index].$key
    this.adminComponentService.deleteQuote(key)
  }

  onDrop(src: Quote, trg: Quote) {
    this.moveItem(src,trg);
  }
  
  moveItem(src, trg) {
    let quotes:Quote[] = this.quoteFormArray.value;
    let fromIndex = quotes.indexOf(src);
    let toIndex = quotes.indexOf(trg);
    let update = {};
    update['/quotes/'+ this.quotesValue[fromIndex].$key] = trg;
    update['/quotes/'+ this.quotesValue[toIndex].$key] = src;
    this.adminComponentService.swapQuote(update);
  }

}
