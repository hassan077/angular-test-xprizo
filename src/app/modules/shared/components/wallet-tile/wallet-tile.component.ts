import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils/DomHelpers';

@Component({
  selector: 'app-wallet-tile',
  templateUrl: './wallet-tile.component.html',
  styleUrls: ['./wallet-tile.component.scss']
})
export class WalletTileComponent implements OnInit {

  @Input() cssClass: string = '';

  constructor() {}

  ngOnInit(): void {
  }
}
