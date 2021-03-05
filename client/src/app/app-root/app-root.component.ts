import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => {
        // User loaded
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          // Initialized basket
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.basket$ = this.basketService.basket$;
  }
}
