import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Output()
  decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output()
  increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() isOrder = false;

  constructor() {}

  ngOnInit(): void {}

  removeBasketItem(item: IBasketItem): void {
    this.remove.emit(item);
  }

  incrementItemQuantity(item: IBasketItem): void {
    this.increment.emit(item);
  }

  decrementItemQuantity(item: IBasketItem): void {
    this.decrement.emit(item);
  }
}
