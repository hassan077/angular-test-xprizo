import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/Transaction`;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  refreshTrigger$: Observable<boolean>;
  private _refreshTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.refreshTrigger$ = this._refreshTrigger.asObservable();
  }

  refreshTrigger(value:boolean){
    this._refreshTrigger.next(value);
  }

}
