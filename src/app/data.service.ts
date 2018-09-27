import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as req from 'sync-request';
// var request = require('sync-request');



// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { Stock } from './models/Stock';
import { environment } from '../environments/environment';
import { Transaction } from './models/Transaction';
import { Folio } from './models/Folio';

interface Profits {
  index: number;
  folio: Folio;
  value: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  profitList: Profits[] = [];
  profitMap: Map<string, Profits> = new Map();
  stockMap: Map<string, Stock> = new Map();
  folioMap: Map<string, Folio> = new Map();
  stocksList: Stock[] = [];
  stockList$: BehaviorSubject<Stock[]> = new BehaviorSubject([]);
  stockSNames: string[] = [];
  history$: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  folioList: Folio[] = [];
  folioList$: BehaviorSubject<Folio[]> = new BehaviorSubject([]);

  constructor(private ws: WebSocketService,
              private http: HttpClient) {

    this.refreshData();
    this.http.get(`${environment.SERVER_URL}/history`).subscribe((data: Transaction[]) => {
      this.history$.next(data);
    });

  }

  initProfits() {

    this.folioList$
    .pipe(map(folioList => {
      this.profitList = [];
      let i = 0;
      for (const folio of folioList) {
        const value = this.folioMap.get(folio.companyName).amount * this.stockMap.get(folio.companyName).currentPrice;
        this.profitList.push({'folio': folio, 'value': value, 'index': i});
        i++;
      }
    }))
    .subscribe();


    this.ws.socket.on('updateStock', (data: Stock[]) => {
      for (const profit of this.profitList) {
        const st = data.find((stock: Stock): boolean => {
          return stock.companyName === profit.folio.companyName;
        }) ;
        profit.value = st.currentPrice * profit.folio.amount;
      }
    });
  }

  refreshData(): void {

    const stocksRes = req.default('GET', `${environment.SERVER_URL}/stock`);
    const folioRes = req.default('GET', `${environment.SERVER_URL}/folio`);
    this.stocksList = JSON.parse(stocksRes.getBody().toString());
    this.folioList = JSON.parse(folioRes.getBody().toString());

    this.initProfits();
    this.initMaps();
    this.stockList$.next(this.stocksList);
    this.folioList$.next(this.folioList);
  }

  initMaps(): void {
    for (const s of this.stocksList) {
      this.stockMap.set(s.companyName, s);
      this.stockSNames.push(s.companyName);
    }
    for (const fl of this.folioList) {
      this.folioMap.set(fl.companyName, fl);
    }
  }

  getHistory(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/history`);
  }

  getFolioByName(name: string): Folio {
    return this.folioMap.get(name);
  }

  getStockList(): Stock[] {
    return this.stocksList;
  }

  getStockMap(): Map<String, Stock> {
    return this.stockMap;
  }

  getNames(): string[] {
    return this.stockSNames;
  }

  buy(stockName: string, number: string): void {
    this.http.put<boolean>(`${environment.SERVER_URL}/buy/${stockName}/${number}`, {})
    .subscribe(() => {
      this.refreshData();
    });
  }

  sell(stockName: string, number: string): void {
    this.http.put<boolean>(`${environment.SERVER_URL}/sell/${stockName}/${number}`, {})
    .subscribe(() => {
      this.refreshData();
    });

  }

}
