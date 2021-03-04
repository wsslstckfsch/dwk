import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressesComponent } from './checkout-addresses/checkout-addresses.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressesComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
  ],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule],
})
export class CheckoutModule {}
