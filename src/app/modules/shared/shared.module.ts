import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { WalletBalanceWidgetComponent } from './components/wallet-balance-widget/wallet-balance-widget.component';
import { WalletExchangeComponent } from './components/wallet-exchange/wallet-exchange.component';
import { WalletTileComponent } from './components/wallet-tile/wallet-tile.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    WalletBalanceWidgetComponent,
    WalletExchangeComponent,
    WalletTileComponent
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    ModalsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TransactionListComponent, WalletBalanceWidgetComponent, WalletExchangeComponent, WalletTileComponent],
  providers: [],
})
export class SharedModule {}
