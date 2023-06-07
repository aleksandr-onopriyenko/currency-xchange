export interface CurrencyMeta {
  currencyCode: string;
  icon: string;
}

export interface CurrencyRates {
  [key: string]: string;
}

export interface ConvertedValues {
  amount1: string;
  amount2: string;
  currentCurrency1: string;
  currentCurrency2: string;
}

export interface CurrencyWithRate extends CurrencyMeta {
  rate: number;
}
