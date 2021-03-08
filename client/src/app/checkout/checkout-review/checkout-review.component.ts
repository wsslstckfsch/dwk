import { Component, Input, OnInit } from '@angular/core';

import UIkit from 'uikit';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() locale: any;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent(): any {
    return this.basketService.createPaymentIntent().subscribe(
      (response: any) => {
        // Payment intent created
        this.switchTab(3);
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
