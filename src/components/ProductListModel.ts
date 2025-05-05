import { IProduct, IProductList } from "../types";
import { IEvents } from "./base/events";

export class ProductListModel implements IProductList {
  protected _items: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  set items(items: IProduct[]) {
    this._items = items;
    this.events.emit('productlist:changed');
  }

  get items() {
    return this._items;
  }

  getById(id: string): IProduct {
    return this._items.find(item => item.id === id);
  }
}