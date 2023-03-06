import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import Swal from 'sweetalert2';
import { WalletExchange } from '../../model/walletExchange';
import { CommonService } from '../../service/common.service';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-wallet-exchange',
  templateUrl: './wallet-exchange.component.html',
  styleUrls: ['./wallet-exchange.component.scss']
})
export class WalletExchangeComponent implements OnInit {
  
  //_selectedAccountId:number;
  _selectedAccount:any;

  @Input() set selectedAccount(value:any) {
    //this._selectedAccountId = value.id;
    this._selectedAccount = value;
    this.showWalletExchangeForm = false;
    this.getAvailableWallets();
  }

  showWalletExchangeForm: boolean = false;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];
  availableUserWallets: any;

  exchangeForm: FormGroup;
  hasError: boolean;
  walletExchange: WalletExchange;

  constructor(
    private authService: AuthService, 
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private commonService: CommonService
    ) {
    this.isLoading$ = this.transactionService.isLoading$;
  }

  ngOnInit(): void {
    this.exchangeForm = new WalletExchange().setValidator(this.fb, this.exchangeForm);
    this.getAvailableWallets();
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.exchangeForm.controls;
  }

  getAvailableWallets(){
    this.availableUserWallets = this.authService.currentUserValue?.userWallets.filter(f => f.id != this._selectedAccount.id);
  }

  toggleWalletExchangeForm(show: boolean) {
    this.showWalletExchangeForm = show;
  }

  private prepareWalletExchange() {
    this.walletExchange = new WalletExchange().setWalletExchange(this.exchangeForm.value);
  }

  onSubmit(){
    this.prepareWalletExchange();
    this.walletExchange.fromAccountId = this._selectedAccount.id;
    this.walletExchange.currencyCode = this._selectedAccount.currencyCode;

    if(this.walletExchange.fromAccountId != 0 && this.walletExchange.currencyCode != "" && this.walletExchange.toAccountId != 0 && this.walletExchange.amount != 0 && this.walletExchange.amount <= this._selectedAccount.realTrust){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Transfer!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.processExchange();
        }
      })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'The values are wrong. Please make sure the amount is lower than account balance.',
      })
    }
  }

  processExchange(){
    this.hasError = false;
    const sb = this.transactionService
      .processWalletExchange(this.walletExchange)
      .subscribe((res: any | undefined) => {
        if (res) {
          Swal.fire(
            'Good job!',
            'Your amount has been transfered!',
            'success'
          );
          this.exchangeForm.reset();
          this.showWalletExchangeForm =false;
          this.commonService.refreshTrigger(true);

        } else {
          this.hasError = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      });
    this.unsubscribe.push(sb);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
