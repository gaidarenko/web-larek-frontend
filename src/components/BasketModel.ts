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

  delete(id: string) {
    this._items.delete(id);
    this.events.emit('basket:change');
  }

  clear() {
    this._items.clear();
  }

  get items() {
    return this._items;
  }

  get count(): number {
    return this._items.size;
  }
}