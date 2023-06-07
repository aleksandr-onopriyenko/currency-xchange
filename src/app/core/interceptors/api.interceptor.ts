import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { CURRENCY } from '@consts';
import { environments } from 'src/environments/environments';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  apiKey = environments.apiKey;
  apiUrl = environments.apiUrl;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isRatesRequest = request.url.includes(CURRENCY.RatesPath);

    if (!isRatesRequest) {
      return next.handle(
        request.clone({
          setParams: {
            apikey: this.apiKey,
          },
          url: `${this.apiUrl}${request.url}`,
        })
      );
    }

    return next.handle(
      request.clone({
        setParams: {
          apikey: this.apiKey,
          symbols: CURRENCY.FilterdList,
        },
        url: `${this.apiUrl}${request.url}`,
      })
    );
  }
}
