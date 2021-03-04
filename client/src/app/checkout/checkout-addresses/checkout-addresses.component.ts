import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';

import UIkit from 'uikit';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-addresses',
  templateUrl: './checkout-addresses.component.html',
  styleUrls: ['./checkout-addresses.component.scss'],
})
export class CheckoutAddressesComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(
    private checkoutService: CheckoutService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(
      (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
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
        () => {
          this.toastr.success('Shipping address saved');
        },
        (error) => {
          this.toastr.error(error.message);
          console.log(error);
        }
      );
  }

  setShippingPrice(deliveryMethodId: string): void {
    const deliveryMethod = this.deliveryMethods.find(
      (item) => item.id.toString() === deliveryMethodId
    );
    this.basketService.setShippingPrice(deliveryMethod.price);
  }

  switchTab(index): void {
    UIkit.switcher('#switcher').show(index);
  }
}
