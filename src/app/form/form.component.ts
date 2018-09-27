import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Stock } from '../models/Stock';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


function quantityValidator(quantity: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const forbidden = !(quantity >= control.value);
    return forbidden ? {'ok': true} : null;
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, OnChanges {
  @Input()
  currStock: Stock;
  form: FormGroup;
  action: string;
  @Input()
  ableToSell: boolean;
  validators: ValidatorFn[] = [Validators.required];
  quantity = false;

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.initForm();
  }

  actionClick(action: string): void {
    if (action === 'buy' && this.action !== 'buy') {
      this.quantity = true;
      this.action = 'buy';
      this.initFormBuy();
    } else if (action === 'sell' && this.ableToSell && this.action !== 'sell') {
      this.quantity = true;
      this.action = 'sell';
      this.initFormSell();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      action: ['', Validators.required],
      quantity: [{value: undefined, disabled: !this.quantity}, Validators.required]
    });
  }

  initFormSell(): void {
    this.form = this.fb.group({
      action: ['sell', Validators.required],
      quantity: [{value: undefined, disabled: !this.quantity} , Validators.compose([
        Validators.required,
        quantityValidator(this.ds.getFolioByName(this.currStock.companyName).amount),
        Validators.min(1)])]
    });
  }

  initFormBuy(): void {
    this.form = this.fb.group({
      action: ['buy', Validators.required],
      quantity: [{value: undefined, disabled: !this.quantity}, Validators.compose([
        Validators.required,
        Validators.min(1)])]
    });
  }

  send(): void {
    if (this.action === 'buy') {
      this.ds.buy(this.currStock.companyName, this.form.value['quantity']);
      this.router.navigate(['/']);
    }
    if (this.action === 'sell') {
      this.ds.sell(this.currStock.companyName, this.form.value['quantity']);
      this.router.navigate(['/']);
    }
  }

}
