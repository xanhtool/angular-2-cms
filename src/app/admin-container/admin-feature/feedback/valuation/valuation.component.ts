import { AdminComponentService } from './../../../admin-shared/services/admin-component.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})

export class ValuationComponent implements OnInit {
  valuationForm: FormGroup;
  thinks = [
    {
      icon: '😠',
      option: 'Cái quái gì thế này?',
      selected: false
    },
    {
      icon: '☹️',
      option: 'Tệ quá',
      selected: false
    },{
      icon: '😐',
      option: 'Tạm được',
      selected: false
    }
    ,{
      icon: '😃',
      option: 'Ổn đấy',
      selected: false
    }
    ,{
      icon: '😍',
      option: 'Tôi thích nó!',
      selected: false
    }
  ]

  purposes = [
    {
      icon: '👍',
      option: 'Có',
      selected: false
    },
    {
      icon: '👎',
      option: 'Không',
      selected: false
    }
  ]

  easy = [
    {
      icon: '😽',
      option: 'Bố cục rành mạch',
      selected: false
    },
    {
      icon: '😿',
      option: 'Bố cục lộn xộn',
      selected: false
    },
    {
      icon: '😸',
      option: 'Nút bấm mô tả rõ ràng',
      selected: false
    },
    {
      icon: '😹',
      option: 'Nút bấm mô tả khó hiểu',
      selected: false
    }
  ]

  appearance = [
    {
      icon: '👨‍🌾',
      option: 'Giao diện thân thiện',
      selected: false
    },
    {
      icon: '👨‍💼',
      option: 'Giao diện hiện đại',
      selected: false
    },
    {
      icon: '👺',
      option: 'Giao diện xấu',
      selected: false
    },
  ]



  constructor(private fb: FormBuilder,public adminComponentService: AdminComponentService) { }

  ngOnInit() {
    this.initForm();
    this.getForm();
  }

  selectThink(target) {
    this.valuationForm.get('think').setValue(target.option);
    this.thinks.forEach((item) => item.selected = false);
    this.thinks.find((item) => item == target).selected = true;
  }

  selectPurpose(target) {
    this.valuationForm.get('purpose').setValue(target.option);
    this.purposes.forEach((item) => item.selected = false);
    this.purposes.find((item) => item == target).selected = true;
  }

  selectEasy(target) {
    this.valuationForm.get('easy').setValue(target.option);
    this.easy.forEach((item) => item.selected = false);
    this.easy.find((item) => item == target).selected = true;
  }

  selectAppearance(target) {
    this.valuationForm.get('appearance').setValue(target.option);
    this.appearance.forEach((item) => item.selected = false);
    this.appearance.find((item) => item == target).selected = true;
  }

  initForm() {
    this.valuationForm = this.fb.group({
      think: '',
      purpose: '',
      easy:'',
      appearance:''
    })
  }

  getForm() {
    this.adminComponentService.getValuation()
    .filter(data => Object.keys(data).length > 1)
    .subscribe(data =>this.valuationForm.setValue(data))
  }

  sendValuation() {
    this.adminComponentService.sendValuation(this.valuationForm.value)
  }

}
