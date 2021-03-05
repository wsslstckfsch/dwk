import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';

import UIkit from 'uikit';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IUserAddress } from '../../shared/models/userAddress';

@Component({
  selector: 'app-checkout-addresses',
  templateUrl: './checkout-addresses.component.html',
  styleUrls: ['./checkout-addresses.component.scss'],
})
export class CheckoutAddressesComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

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

  saveUserShippingAddress(): void {
    this.accountService
      .updateUserShippingAddress(
        this.checkoutForm.get('shippingAddressForm').value
      )
      .subscribe(
        (address: IUserAddress) => {
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
