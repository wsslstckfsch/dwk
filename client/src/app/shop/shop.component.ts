import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from '../shared/models/product';
import {ShopService} from './shop.service';
import {IProductType} from '../shared/models/productType';
import {ShopParams} from '../shared/models/shopParams';
import {BasketService} from '../basket/basket.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchString: ElementRef;
  products: IProduct[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price Asc', value: 'priceAsc'},
    {name: 'Price Desc', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
  }

  addItemToBasket(product: IProduct): void {
    this.basketService.addItemToBasket(product);
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageIndex = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe(response => {
      this.productTypes = [{id: 0, name: 'All books'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onTypeSelected(event): void {
    this.shopParams.typeId = event.target.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(event): void {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event): void {
    if (this.shopParams.pageIndex !== event) {
      this.shopParams.pageIndex = event;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchString.nativeElement.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchString.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
