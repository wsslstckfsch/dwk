import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;
  locale: any;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private sharedService: SharedService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.locale = this.sharedService.getLocaleJson();
      });
  }

  ngOnInit(): void {
    this.ordersService
      .getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (order: IOrder) => {
          this.order = order;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
