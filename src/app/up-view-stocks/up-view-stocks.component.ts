import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Stock } from '../models/Stock';

@Component({
  selector: 'app-up-view-stocks',
  templateUrl: './up-view-stocks.component.html',
  styleUrls: ['./up-view-stocks.component.css']
})
export class UpViewStocksComponent implements OnInit {

  stockList: Stock[] = [];
  currentStock: Stock;

  constructor(private ds: DataService) {
    this.ds.stockList$.subscribe(x => {
      this.stockList = x;
    });
    this.currentStock = this.stockList[0];
  }

  ngOnInit() {
  }

}
