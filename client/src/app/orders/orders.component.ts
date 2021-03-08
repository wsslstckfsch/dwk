import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { AccountService } from '../account/account.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  currentLang: string;
  locale: any;

  constructor(
    private ordersService: OrdersService,
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.locale = this.sharedService.getLocaleJson();
      });
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getOrdersForUser().subscribe(
      (orders: IOrder[]) => {
        this.orders = orders;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
  }
}
