import { IEvents } from "./base/events";

export class Basket {
  protected container: HTMLElement;
  protected events: IEvents;
  protected _counter: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;
    this._counter = container.querySelector('.header__basket-counter');

    container.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.events.emit('basket:click');
    })
  }

  set counter(value: number) {
    this._counter.textContent = value.toString();
  }
}