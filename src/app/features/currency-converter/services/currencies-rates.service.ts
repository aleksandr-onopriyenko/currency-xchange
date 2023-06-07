import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { CurrencyRates } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class CurrenciesRatesService {
  private rates$ = new BehaviorSubject<CurrencyRates | null>(null);

  get rates(): BehaviorSubject<CurrencyRates | null> {
    return this.rates$;
  }

  save(currencies: CurrencyRates) {
    this.rates$.next(currencies);
  }

  get(...currencyCodes: string[]): number[] {
    const rates = this.rates$.value;

    if (!rates) return [1, 1];

    return currencyCodes.map((code) => +rates[code]);
  }
}
