import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTabsModule, MatSortModule } from '@angular/material';



import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfitsComponent } from './profits/profits.component';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { HistoryTradesComponent } from './history-trades/history-trades.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { ROUTES } from './app.routing';
import { ChooseStockComponent } from './choose-stock/choose-stock.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { FormComponent } from './form/form.component';
import { UpViewStocksComponent } from './up-view-stocks/up-view-stocks.component';
import { OneStockViewComponent } from './one-stock-view/one-stock-view.component';

@NgModule({
  declarations: [
    OneStockViewComponent,
    UpViewStocksComponent,
    AppComponent,
    ProfitsComponent,
    TradeFormComponent,
    HistoryTradesComponent,
    StocksListComponent,
    ChooseStockComponent,
    FormComponent
  ],
  imports: [
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
