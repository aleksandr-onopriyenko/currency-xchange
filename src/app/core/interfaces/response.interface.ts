export interface SupportedResponse {
  supportedCurrenciesMap: {
    [key: string]: {
      currencyCode: string;
      icon: string;
    };
  };
}

export interface RatesResponse {
  rates: { [key: string]: string };
}
