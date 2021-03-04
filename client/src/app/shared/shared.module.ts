import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderTotalsComponent} from './components/order-totals/order-totals.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TextInputComponent} from './components/text-input/text-input.component';

@NgModule({
  declarations: [OrderTotalsComponent, TextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [OrderTotalsComponent, ReactiveFormsModule, TextInputComponent]
})
export class SharedModule {
}
