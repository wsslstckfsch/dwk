import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutAddressShippingComponent } from './checkout-address-shipping/checkout-address-shipping.component';
import { CheckoutAddressBillingComponent } from './checkout-address-billing/checkout-address-billing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
    CheckoutAddressShippingComponent,
    CheckoutAddressBillingComponent,
  ],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule, FormsModule],
})
export class CheckoutModule {}
