import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotals$: Observable<IBasketTotals>;
  locale: any;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private basketService: BasketService,
    private sharedService: SharedService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.locale = this.sharedService.getLocaleJson();
      });
  }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getBillingAddressFormValues();
    this.getShippingAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      billingAddressForm: this.fb.group({
        fullName: [null, Validators.required],
        uid: [null, []],
        addressLine1: [null, []],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        zip: [null, Validators.required],
        country: [null, Validators.required],
      }),
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
          // console.log('shipping', address);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBillingAddressFormValues(): void {
    this.accountService.getUserBillingAddress().subscribe(
      (address) => {
        if (address) {
          this.checkoutForm.get('billingAddressForm').patchValue(address);
          // console.log('billing', address);
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
