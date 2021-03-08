import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import UIkit from 'uikit';
import { BasketService } from '../../basket/basket.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  staticContentUrl = environment.staticContentUrl;
  product: IProduct;
  quantity = 1;
  onB2bPage: boolean;
  currentLang: string;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private router: Router,
    private sharedService: SharedService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.onB2bPage = this.sharedService.onB2bPage();
        this.getProduct();
      });
  }

  ngOnInit(): void {}

  addItemToBasket(): void {
    this.basketService.addItemToBasket(
      this.product,
      this.quantity,
      this.onB2bPage
    );
  }

  incrementQuantity(): void {
    if (this.onB2bPage) {
      if (this.quantity === 1) {
        this.quantity += 4;
      } else {
        this.quantity += 5;
      }
    } else {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      if (this.onB2bPage) {
        this.quantity -= 5;
      } else {
        this.quantity--;
      }
    }
  }

  getProduct(): void {
    this.shopService
      .getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openLightbox(): void {
    UIkit.lightbox('#lightbox').show(0);
  }
}
