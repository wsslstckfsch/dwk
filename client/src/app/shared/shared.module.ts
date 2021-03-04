import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderTotalsComponent,
    TextInputComponent,
    BasketSummaryComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    OrderTotalsComponent,
    ReactiveFormsModule,
    TextInputComponent,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
