import { BehaviorSubject } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { ConvertedValues } from '@interfaces';
import { CurrenciesRatesService } from './currencies-rates.service';

@Injectable({ providedIn: 'root' })
export class CurrenciesConverterService {
  private rates = inject(CurrenciesRatesService);

  convertedValues = new BehaviorSubject({
    amount1: '1',
    amount2: '36.9',
    currentCurrency1: 'USD',
    currentCurrency2: 'UAH',
  });

  handleAmount1Change(amount: string) {
    const { currentCurrency1, currentCurrency2 } = this.convertedValues.value;
    const [currency1, currency2] = this.rates.get(currentCurrency1, currentCurrency2);

    this.updateConvertedValues({
      amount1: amount,
      amount2: this.format((+amount * currency2) / currency1),
    });
  }

  handleCurrency1Change(value: string) {
    const { amount1, currentCurrency2 } = this.convertedValues.value;
    const [currency1, currency2] = this.rates.get(value, currentCurrency2);

    this.updateConvertedValues({
      amount1,
      amount2: this.format((+amount1 * currency2) / currency1),
      currentCurrency1: value,
    });
  }

  handleAmount2Change(amount: string) {
    const { currentCurrency1, currentCurrency2 } = this.convertedValues.value;
    const [currency1, currency2] = this.rates.get(currentCurrency1, currentCurrency2);

    this.updateConvertedValues({
      amount1: this.format((+amount * currency1) / currency2),
      amount2: amount,
    });
  }

  handleCurrency2Change(value: string) {
    const { amount2, currentCurrency1 } = this.convertedValues.value;
    const [currency1, currency2] = this.rates.get(currentCurrency1, value);

    this.updateConvertedValues({
      amount1: this.format((+amount2 * currency1) / currency2),
      amount2,
      currentCurrency2: value,
    });
  }

  private updateConvertedValues(values: Partial<ConvertedValues>) {
    this.convertedValues.next({ ...this.convertedValues.value, ...values });
  }

  private format(number: number) {
    return number.toFixed(2);
  }
}
