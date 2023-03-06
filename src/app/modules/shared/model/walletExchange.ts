import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class WalletExchange {
    "description": string;
    "reference": string;
    "amount": number;
    "fromAccountId": number;
    "toAccountId": number;
    "currencyCode": string;
    "toAmount": number;

  setWalletExchange(walletExchange: any): WalletExchange {
    this.description = walletExchange.description;
    this.reference = walletExchange.reference;
    this.amount = walletExchange.amount;
    this.fromAccountId = walletExchange.fromAccountId;
    this.toAccountId = walletExchange.toAccountId;
    this.currencyCode = walletExchange.currencyCode;
    this.toAmount = walletExchange.toAmount;

    return this;
  }

  setValidator(fb: FormBuilder, form: FormGroup) {
    form = fb.group({
      description: [''],
      reference: [''],
      amount: [0, Validators.compose([
        Validators.required
      ])],
      fromAccountId: [0, [Validators.required]],
      toAccountId: [0, [Validators.required]],
      currencyCode: ['', [Validators.required]],
      toAmount: [0],
    });

    return form;
  }
}
