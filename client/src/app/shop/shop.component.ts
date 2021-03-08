import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { BasketService } from '../basket/basket.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchString: ElementRef;
  products: IProduct[];
  productTypes: IProductType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Asc', value: 'priceAsc' },
    { name: 'Price Desc', value: 'priceDesc' },
  ];
  onB2bPage: boolean;
  currentLang: string;
  locale: any;

  constructor(
    private shopService: ShopService,
    private basketService: BasketService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.locale = this.sharedService.getLocaleJson();
        this.onB2bPage = this.sharedService.onB2bPage();
        this.shopParams = this.shopService.getShopParams();
        this.getProducts(true);
        this.getProductTypes();
      });
  }

  ngOnInit(): void {}

  addItemToBasket(product: IProduct): void {
    if (this.onB2bPage) {
      this.basketService.addItemToBasket(product, 5, this.onB2bPage);
    } else {
      this.basketService.addItemToBasket(product, 1, this.onB2bPage);
    }
  }

  getProducts(useCache = false): void {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe(
      (response) => {
        this.productTypes = [{ id: 0, name: 'All books' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTypeSelected(event): void {
    const params = this.shopService.getShopParams();
    params.typeId = event.target.value;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(event): void {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event): void {
    const params = this.shopService.getShopParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(): void {
    const params = this.shopService.getShopParams();
    params.search = this.searchString.nativeElement.value;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(): void {
    this.searchString.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
