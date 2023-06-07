import { FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CurrencyMeta } from '@interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() value!: CurrencyMeta;
  @Input() options!: CurrencyMeta[];
  @Output('on-change') change: EventEmitter<string> = new EventEmitter();

  formControl!: FormControl;

  ngOnInit() {
    const { currencyCode, icon } = this.value;
    this.formControl = new FormControl({ currencyCode, icon });
  }

  compareObjects(currency1: CurrencyMeta, currency2: CurrencyMeta) {
    return currency1.icon === currency2.icon && currency1.currencyCode === currency2.currencyCode;
  }

  iconToBg(icon: string): string {
    return `background-image: url(${icon})`;
  }
}
