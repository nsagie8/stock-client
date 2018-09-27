import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../models/Stock';

@Component({
  selector: 'app-one-stock-view',
  templateUrl: './one-stock-view.component.html',
  styleUrls: ['./one-stock-view.component.css']
})
export class OneStockViewComponent implements OnInit {
  @Input()
  stock: Stock;

  constructor() { }

  ngOnInit() {
  }

}
