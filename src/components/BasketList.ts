import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class BasketList {
  protected element: HTMLElement;
  protected events: IEvents;
  protected price: HTMLElement;
  protected button: HTMLButtonElement;
  protected list: HTMLElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.list = this.element.querySelector('.basket__list');
    this.price = this.element.querySelector('.basket__price');
    this.button = this.element.querySelector('.basket__button');

    if (this.button) {
      this.button.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('basket:order');
      });
    }
  }

  render(items?: HTMLElement[], totalPrice?: number) {

    console.log(`BasketList::render items=${items}`);
    
    if (items) {
      this.price.textContent = totalPrice ? `${totalPrice.toString()} синапсов` : '';
      this.list.replaceChildren(...items);
      this.button.disabled = !items.length ? true : false;
    }

    return this.element;
  }

  delete() {
    this.element.remove();
    this.element = null;
  }
}