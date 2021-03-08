import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';
import { SharedService } from '../../shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  onB2bPage: boolean;
  currentLang: string;
  @Input() locale: any;

  constructor(private sharedService: SharedService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.onB2bPage = this.sharedService.onB2bPage();
      });
  }

  ngOnInit(): void {
    this.onB2bPage = this.sharedService.onB2bPage();
    this.currentLang = this.sharedService.checkLang();
  }

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
