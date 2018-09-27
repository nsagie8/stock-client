import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { WebSocketService } from '../web-socket.service';
import { Observable, of } from 'rxjs';
import { Folio } from '../models/Folio';
import { map } from 'rxjs/operators';
import { Stock } from '../models/Stock';

interface Profits {
  index: number;
  folio: Folio;
  value: number;
}

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit {

  profitsTable: Profits[] = [];
  displayedColumns: string[] = ['stockName', 'avarage price', 'amount', 'profit', 'value'];

  constructor(private ds: DataService, private ws: WebSocketService) {
    this.profitsTable = this.ds.profitList;
  }

  ngOnInit() { }

}
