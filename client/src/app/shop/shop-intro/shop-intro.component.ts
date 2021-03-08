import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shop-intro',
  templateUrl: './shop-intro.component.html',
  styleUrls: ['./shop-intro.component.scss'],
})
export class ShopIntroComponent implements OnInit {
  locale: any;
  currentLang: string;

  constructor(private sharedService: SharedService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.locale = this.sharedService.getLocaleJson();
      });
  }

  ngOnInit(): void {}
}
