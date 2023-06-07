import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  CurrenciesConverterService,
  CurrencyApiService,
  CurrenciesSupportedService,
} from './services';
import { ConvertedValues, CurrencyMeta } from '@interfaces';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverterComponent {
  apiService = inject(CurrencyApiService);
  convertedService = inject(CurrenciesConverterService);

  convertedValues$ = this.convertedService.convertedValues;
  selectOptions$ = inject(CurrenciesSupportedService).supported;

  getCurrencyWithIcon(name: string) {
    return {
      currencyCode: name,
      icon: `https://currencyfreaks.com/photos/flags/${name.toLowerCase()}.png`,
    };
  }

  isLoaded(currency: {
    convertedValues: ConvertedValues | null;
    options: CurrencyMeta[] | null;
  }): boolean {
    return !!currency && !!currency.options && !!currency.convertedValues;
  }
}
