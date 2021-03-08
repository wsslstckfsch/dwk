import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IOrder } from '../../shared/models/order';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
})
export class CheckoutSuccessComponent implements OnInit {
  order: IOrder;
  currentLang: string;
  locale: any;

  constructor(private router: Router, private sharedService: SharedService) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.locale = this.sharedService.getLocaleJson();
      });
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {}
}
