import { BehaviorSubject } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { CurrencyWithRate, CurrencyMeta } from '@interfaces';
import { CurrenciesRatesService } from './currencies-rates.service';

@Injectable({ providedIn: 'root' })
export class CurrenciesSupportedService {
  ratesState = inject(CurrenciesRatesService);
  private supported$ = new BehaviorSubject<CurrencyMeta[] | null>(null);
  private headerValues$ = new BehaviorSubject<CurrencyWithRate[] | null>(null);

  get supported() {
    return this.supported$;
  }

  get headerValues() {
    return this.headerValues$;
  }

  save(currencies: CurrencyMeta[]) {
    this.supported$.next(currencies);
  }

  setHeadersCurrencies(currencies: CurrencyMeta[]) {
    const [usd, eur, uah] = this.ratesState.get('USD', 'EUR', 'UAH');

    this.headerValues$.next(
      currencies.filter(this.isHeaderRates).map(this.addRatesToHeaderCurrencies(usd, uah, eur))
    );
  }

  private isHeaderRates(currency: CurrencyMeta): boolean {
    return currency.currencyCode === 'USD' || currency.currencyCode === 'EUR';
  }

  private addRatesToHeaderCurrencies(usd: number, uah: number, eur: number) {
    return function (currency: CurrencyMeta) {
      return {
        ...currency,
        rate:
          currency.currencyCode === 'USD'
            ? usd * uah
            : currency.currencyCode === 'EUR'
            ? eur * uah
            : uah,
      };
    };
  }
}
