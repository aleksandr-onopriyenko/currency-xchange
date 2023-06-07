import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  CurrenciesSupportedService,
  CurrencyApiService,
} from '@features/currency-converter/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  apiService = inject(CurrencyApiService);
  currenciesSupportedService = inject(CurrenciesSupportedService);

  headerCurrencies$ = this.currenciesSupportedService.headerValues;

  ngOnInit() {
    this.apiService.rates().subscribe();
    this.apiService.supported().subscribe();
  }
}
