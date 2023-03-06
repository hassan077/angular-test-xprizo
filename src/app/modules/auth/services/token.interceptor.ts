import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
    const authData = localStorage.getItem(authLocalStorageToken);
    if (authData) {
      var authDataParse = JSON.parse(authData);
      if (authDataParse) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authDataParse.token}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
