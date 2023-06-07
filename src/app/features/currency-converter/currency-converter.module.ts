import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CurrencyConverterComponent } from './currency-converter.component';
import { InputComponent, SelectComponent, LoaderComponent } from '@shared/components';

@NgModule({
  declarations: [CurrencyConverterComponent, InputComponent, SelectComponent, LoaderComponent],

  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CurrencyConverterComponent],
})
export class CurrencyConverterModule {}
