import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IUserBillingAddress } from '../../shared/models/userBillingAddress';

import UIkit from 'uikit';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-checkout-address-billing',
  templateUrl: './checkout-address-billing.component.html',
  styleUrls: ['./checkout-address-billing.component.scss'],
})
export class CheckoutAddressBillingComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];
  onB2bPage: boolean;
  currentLang: string;
  currentBillingValue: string;
  @Input() locale: any;

  constructor(
    private checkoutService: CheckoutService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private basketService: BasketService,
    private sharedService: SharedService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.onB2bPage = this.sharedService.onB2bPage();
      });
  }

  ngOnInit(): void {
    this.currentBillingValue = this.checkoutForm
      .get('billingAddressForm')
      .get('country').value;

    this.checkoutService.getDeliveryMethods().subscribe(
      (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveUserBillingAddress(): void {
    this.accountService
      .updateUserBillingAddress(
        this.checkoutForm.get('billingAddressForm').value
      )
      .subscribe(
        (address: IUserBillingAddress) => {
          this.toastr.success('Billing address saved');
          this.checkoutForm.get('billingAddressForm').reset(address);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  switchTab(index): void {
    UIkit.switcher('#switcher').show(index);
  }
}
