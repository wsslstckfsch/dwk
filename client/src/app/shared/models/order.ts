import { IUserShippingAddress } from './userShippingAddress';
import { IUserBillingAddress } from './userBillingAddress';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shippingAddress: IUserShippingAddress;
  billingAddress: IUserBillingAddress;
}

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
  buyerEmail: string;
  orderDate: string;
  shippingAddress: IUserShippingAddress;
  billingAddress: IUserBillingAddress;
  deliveryMethod: string;
  shippingPrice: number;
  subtotal: number;
  total: number;
  status: string;
}

export interface IOrderItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}
