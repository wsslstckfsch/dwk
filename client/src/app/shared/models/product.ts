import {IProductImage} from './productImage';

export interface IProduct {
  id: number;
  langAlpha2: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isbn: string;
  pages: number;
  productType: string;
  images: IProductImage[];
}
