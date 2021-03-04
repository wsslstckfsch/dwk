import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

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
