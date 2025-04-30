// import { IProduct, IProductList } from "../types";
import { IEvents } from "./base/events";

export class BasketModel {
  protected _items: Set<string>;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this._items = new Set<string>();
  }

  add(id: string) {
    this._items.add(id);
    this.events.emit('basket:change');
  }

  get count(): number {
    return this._items.size;
  }
}