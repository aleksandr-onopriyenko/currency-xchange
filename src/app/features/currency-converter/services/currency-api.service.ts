import { map } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { CURRENCY } from '@consts';
import { RatesResponse, SupportedResponse } from '@interfaces';

import { ApiService } from '@services';
import { CurrenciesRatesService } from './currencies-rates.service';
import { CurrenciesSupportedService } from './currencies-supported.service';

@Injectable({ providedIn: 'root' })
export class CurrencyApiService {
  private api = inject(ApiService);
  private ratesState = inject(CurrenciesRatesService);
  private supportedState = inject(CurrenciesSupportedService);

  supported() {
    return this.api.get<SupportedResponse>(CURRENCY.SupportedPath).pipe(
      map(({ supportedCurrenciesMap: code }) => {
        const filteredCurrency = this.filteredRates(code).map((key) => ({
          currencyCode: code[key].currencyCode,
          icon: code[key].icon,
        }));
        this.supportedState.save(filteredCurrency);
        this.supportedState.setHeadersCurrencies(filteredCurrency);
        return filteredCurrency;
      })
    );
  }

  rates() {
    return this.api.get<RatesResponse>(CURRENCY.RatesPath).pipe(
      map((currencies) => {
        this.ratesState.save(currencies.rates);
        return currencies.rates;
      })
    );
  }

  private filteredRates(currencies: { [code: string]: {} }) {
    return Object.keys(currencies).filter((key) => CURRENCY.FilterdList.includes(key));
  }
}
