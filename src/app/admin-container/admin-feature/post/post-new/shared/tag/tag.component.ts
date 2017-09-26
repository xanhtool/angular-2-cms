import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() parentForm:FormGroup;
  tagsInput:any;
  tags:any;
  tagsForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.convertToTagList()
  }

  convertToTagList() {
    this.tagsForm = new FormGroup ({
      tagsInput: new FormControl()
    });

    this.tagsForm.valueChanges
    .map(form => form.tagsInput)
    .map(tagsInput => tagsInput.split(','))
    .map(tagList => Object.assign({}, tagList))
    .subscribe( (tagObject) => {
      this.updateTags(tagObject)
      this.tags = Object.keys(tagObject).map(key => tagObject[key])
    })
  }

  updateTags(tags) {
    this.parentForm.controls['postOption'].patchValue({tags})
  }

}
