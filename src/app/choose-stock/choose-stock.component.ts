import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Stock } from '../models/Stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-stock',
  templateUrl: './choose-stock.component.html',
  styleUrls: ['./choose-stock.component.css']
})
export class ChooseStockComponent implements OnInit {

  stockSNames: string[] = this.ds.getNames();
  @Input()
  currName = '';

  constructor(private ds: DataService,
              private router: Router) {
    this.stockSNames = ds.getNames();
  }

  navToForm(name: string) {
    this.currName = name;
    this.router.navigate(['/', 'trade-form', name]);
  }

  ngOnInit() {
  }

}
