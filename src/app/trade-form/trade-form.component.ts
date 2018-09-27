import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { BehaviorSubject } from 'rx';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Stock } from '../models/Stock';
import { Folio } from '../models/Folio';


@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.css']
})
export class TradeFormComponent implements OnInit {

  // currName$: BehaviorSubject<string> = new BehaviorSubject("");
  currName: string;
  ableToSell = true;
  currStock: Stock;
  currFl: Folio;
  actionToArrayMap: Map<string, number[]> = new Map();

  constructor(private ds: DataService,
              private activatedRoute: ActivatedRoute,
              ) {

    this.activatedRoute.params.subscribe((params) => {
      this.currName = params['stockName'];
      this.currStock = this.ds.stockMap.get(this.currName);
      this.currFl = this.ds.getFolioByName(this.currName);
      this.ableToSell = (this.currFl.amount !== 0);
    });
  }


  ngOnInit() {
  }

}
