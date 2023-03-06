import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  get authenticationService() {
    return this._injector.get(AuthService);
  }

  constructor(
    private router: Router,
    private _injector: Injector
  ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['']);
            }
            if (err.status === 500) {
                // we can handle 500 response here
            }
            if (err.status === 400) {
                //we can handle 400 response here
            }
            return throwError(() => err)
        }))
    }
}