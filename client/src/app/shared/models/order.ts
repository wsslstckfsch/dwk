import { IUserAddress } from './userAddress';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shippingAddress: IUserAddress;
}

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
  buyerEmail: string;
  orderDate: string;
  shippingAddress: IUserAddress;
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
