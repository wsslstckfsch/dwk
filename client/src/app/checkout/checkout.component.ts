import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getShippingAddressFormValues();
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
}
