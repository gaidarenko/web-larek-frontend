export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductList {
  items: IProduct[];
}

export type TProductId = {
  id: string;
}

export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export type TOrderInfo = Pick<IOrder, 'payment' | 'email' | 'phone' | 'address'>;

export interface IOrderResult {
  id?: string;
  total?: number;
  error?: string;
}

export type TStringValue = {
  value: string;
}

export type TFormState = {
  valid: boolean;
}