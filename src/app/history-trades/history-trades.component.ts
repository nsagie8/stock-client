import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../models/Transaction';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-history-trades',
  templateUrl: './history-trades.component.html',
  styleUrls: ['./history-trades.component.css']
})
export class HistoryTradesComponent implements OnInit {

  displayedColumns: string[] = ['stockName', 'priceAtTran', 'action', 'quantity', 'date'];
  // history: Observable<Transaction[]>;
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource([]);

  constructor(private ds: DataService) {
    this.ds.getHistory().subscribe((data: Transaction[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });

    // this.ds.history$.subscribe((data: Transaction[]) => {
    // });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
