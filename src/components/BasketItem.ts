import { IProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class BasketItem {
  protected element: HTMLElement;
  protected events: IEvents;
  protected productId: string;
  protected button: HTMLButtonElement;
  protected title: HTMLElement;
  protected price: HTMLElement;
  protected index: HTMLElement;


  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.index = this.element.querySelector('.basket__item-index');
    this.title = this.element.querySelector('.card__title');
    this.price = this.element.querySelector('.card__price');
    this.button = this.element.querySelector('.basket__item-delete');

    if (this.button) {
      this.button.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('basket:delete', { id: this.productId });
      });
    }
  }

  render(data: IProduct, index: number) {
    this.index.textContent = index.toString();
    this.title.textContent = data.title;
    this.price.textContent = data.price ? `${data.price} синапсов` : 'Бесценно';
    this.productId = data.id;

    return this.element;
}

  get id() {
    return this.productId;
  }

  delete() {
    this.element.remove();
    this.element = null;
  }

}