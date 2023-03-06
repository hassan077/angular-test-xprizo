import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-balance-widget',
  templateUrl: './wallet-balance-widget.component.html'
})
export class WalletBalanceWidgetComponent implements OnInit {
  @Input() svgIcon = '';
  @Input() iconColor = '';
  @Input() color = '';
  @Input() description = '';
  @Input() title = '';
  constructor() { }

  ngOnInit(): void {
  }

}
