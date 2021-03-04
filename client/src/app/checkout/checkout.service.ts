import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { Observable } from 'rxjs';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.baseUrl}/orders`, order);
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http.get(`${this.baseUrl}/orders/delivery-methods`).pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => a.price - b.price);
      })
    );
  }
}
