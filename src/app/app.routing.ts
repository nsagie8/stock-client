import { StocksListComponent } from './stocks-list/stocks-list.component';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { ProfitsComponent } from './profits/profits.component';
import { HistoryTradesComponent } from './history-trades/history-trades.component';
import { Route } from '@angular/router';
import { ChooseStockComponent } from './choose-stock/choose-stock.component';


export const ROUTES: Route[] = [
  {
    path: 'stocks-list', component: StocksListComponent
  },
  {
    path: 'trade-form', component: ChooseStockComponent
  },
  {
    path: 'profits', component: ProfitsComponent
  },
  {
    path: 'trade-form/:stockName', component: TradeFormComponent
  },
  {
    path: 'history', component: HistoryTradesComponent
  },

  {
    path: '', pathMatch: 'full', redirectTo: '/stocks-list'
  }

];
