import { Api, ApiListResponse } from './base/api';
import { IProduct, IProductList } from "../types";

export interface ILarekApi {
    getProductList: () => Promise<IProduct[]>;
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
                image: this.cdn + item.image
            }))
        );
    }
/*
    getLotItem(id: string): Promise<ILot> {
        return this.get(`/lot/${id}`).then(
            (item: ILot) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getLotUpdate(id: string): Promise<LotUpdate> {
        return this.get(`/lot/${id}/_auction`).then(
            (data: LotUpdate) => data
        );
    }

    getLotList(): Promise<ILot[]> {
        return this.get('/lot').then((data: ApiListResponse<ILot>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    placeBid(id: string, bid: IBid): Promise<LotUpdate> {
        return this.post(`/lot/${id}/_bid`, bid).then(
            (data: ILot) => data
        );
    }

    orderLots(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
*/
}