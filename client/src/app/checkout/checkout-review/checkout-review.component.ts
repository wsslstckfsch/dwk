import { Component, OnInit } from '@angular/core';

import UIkit from 'uikit';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  switchTab(index): void {
    UIkit.switcher('#switcher').show(index);
  }
}
