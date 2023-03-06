import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WalletExchange } from '../model/walletExchange';

const API_URL = `${environment.apiUrl}/Transaction`;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  isLoading$: Observable<boolean>;
  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.isLoading$ = this._isLoadingSubject.asObservable();
  }

  processWalletExchange(walletExchage: WalletExchange): Observable<any> {
    this._isLoadingSubject.next(true);
    return this.http.post<WalletExchange>(`${API_URL}/WalletExchange?commit=true`, walletExchage).pipe(
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this._isLoadingSubject.next(false))
    );
  }

}
