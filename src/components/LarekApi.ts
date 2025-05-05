import { Api, ApiListResponse } from './base/api';
import { IProduct, IOrder, IOrderResult } from "../types";

export interface ILarekApi {
  getProductList: () => Promise<IProduct[]>;
  orderProducts(order: IOrder): Promise<IOrderResult>;
}
  
export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image.replace('.svg', '.png')
      }))
    );
  }

  orderProducts(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    );
  }

}