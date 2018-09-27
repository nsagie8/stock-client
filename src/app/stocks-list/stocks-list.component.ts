import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Stock } from '../models/Stock';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {

  displayedColumns: string[] = ['companyName', 'startPrice', 'currentPrice', 'changePercentage', 'button'];
  stocksList: Stock[] = [];
  stockList$: Observable<Stock[]>;

  constructor(private ws: WebSocketService,
              private ds: DataService,
              private router: Router) {



    this.stockList$ = this.ds.stockList$;
    this.ws.socket.on('updateStock', (data: Stock[]) => {
      this.stocksList = data;
      this.ds.stockList$.next(data);
    });
  }

  trade(name: string) {
    this.router.navigate(['/', 'trade-form', name]);
  }

  ngOnInit() {
  }

}
