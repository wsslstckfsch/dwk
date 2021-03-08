import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { AccountService } from '../account/account.service';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent implements OnInit {
  basket$: Observable<IBasket>;
  onB2bPage: boolean;
  langs = ['de', 'en', 'es', 'ru', 'jp'];
  currentLang: string;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.sharedService.handleInitialLangRedirect();
        this.currentLang = this.sharedService.checkLang();
        this.onB2bPage = this.sharedService.onB2bPage();
      });
  }

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
        console.log('No user', error);
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
          console.log('No basket', error);
        }
      );
    }
    this.basket$ = this.basketService.basket$;
  }
}
