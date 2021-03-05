import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotals$: Observable<IBasketTotals>;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getShippingAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddressForm: this.fb.group({
        fullName: [null, Validators.required],
        addressLine1: [null, []],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        zip: [null, Validators.required],
        country: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
      }),
    });
  }

  getShippingAddressFormValues(): void {
    this.accountService.getUserShippingAddress().subscribe(
      (address) => {
        if (address) {
          this.checkoutForm.get('shippingAddressForm').patchValue(address);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDeliveryMethodValue(): void {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket && basket.deliveryMethodId !== null) {
      this.checkoutForm
        .get('shippingAddressForm')
        .get('country')
        .patchValue(basket.deliveryMethodId.toString());
    }
  }
}
