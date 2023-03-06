import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionsRespModel } from '../model/transactionsMode.model';

const API_URL = `${environment.apiUrl}/Wallet`;

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getTransationsByWalletId(accountId: number, fromDate:string="", toDate:string=""): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<TransactionsRespModel>(`${API_URL}/Transactions/${accountId}`).pipe(
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
