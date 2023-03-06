import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth';
import { CommonService } from '../shared/service/common.service';
import { TransactionsRespModel } from './model/transactionsMode.model';
import { WalletService } from './service/wallet.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];
  userWallets;
  walletTransations:TransactionsRespModel;
  showContainer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  walletId="";

  constructor(
    private authService: AuthService, 
    private walletService: WalletService,
    private commonService: CommonService
    ) {
    this.isLoading$ = this.walletService.isLoading$;

    this.userWallets = this.authService.currentUserValue?.userWallets;
    console.log(this.userWallets);
  }

  ngOnInit(): void {
    const sb = this.commonService.refreshTrigger$.subscribe(
      (res:boolean) => {
        if(res){
          this.onWalletSelected(this.walletId);
        }
      }
    );
    this.unsubscribe.push(sb);
  }

  onWalletSelected(walletId:any){
    if(walletId != null  && walletId != "" && walletId != 0){
      const sb = this.walletService.getTransationsByWalletId(walletId)
      .subscribe(
        (res:TransactionsRespModel) => {
        console.log(res);
        this.walletTransations = res;
        this.showContainer$.next(true);
        }
      );
      this.unsubscribe.push(sb);
    }else{
      this.showContainer$.next(false)
    }

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
