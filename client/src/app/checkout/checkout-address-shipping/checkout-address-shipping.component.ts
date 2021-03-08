import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IUserShippingAddress } from '../../shared/models/userShippingAddress';

import UIkit from 'uikit';

@Component({
  selector: 'app-checkout-address-shipping',
  templateUrl: './checkout-address-shipping.component.html',
  styleUrls: ['./checkout-address-shipping.component.scss'],
})
export class CheckoutAddressShippingComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  shippingIsBilling: boolean;
  currentShippingValue: string;

  constructor(
    private checkoutService: CheckoutService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.currentShippingValue = this.checkoutForm
      .get('shippingAddressForm')
      .get('country').value;

    this.checkoutService.getDeliveryMethods().subscribe(
      (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
        this.setShippingPrice(this.currentShippingValue);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  patchShippingValues(): void {
    if (this.shippingIsBilling) {
      const billingValues = this.checkoutForm.get('billingAddressForm').value;
      this.checkoutForm.get('shippingAddressForm').patchValue(billingValues);
      const shippingValue = this.checkoutForm
        .get('billingAddressForm')
        .get('country').value;
      this.setShippingPrice(shippingValue);
    }
  }

  saveUserShippingAddress(): void {
    this.accountService
      .updateUserShippingAddress(
        this.checkoutForm.get('shippingAddressForm').value
      )
      .subscribe(
        (address: IUserShippingAddress) => {
          this.toastr.success('Shipping address saved');
          this.checkoutForm.get('shippingAddressForm').reset(address);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setShippingPrice(deliveryMethodId: string): void {
    // console.log('UPDATING SHIPPING PRICE', deliveryMethodId);
    const deliveryMethod = this.deliveryMethods.find(
      (item) => item.id.toString() === deliveryMethodId
    );
    this.basketService.setShippingPrice(deliveryMethod);
  }

  switchTab(index): void {
    UIkit.switcher('#switcher').show(index);
  }
}
