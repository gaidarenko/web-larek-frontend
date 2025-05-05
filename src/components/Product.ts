import { IProduct } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

const styles:Record<string, string> = {
  'софт-скил': 'card__category_soft',  
  'другое': 'card__category_other',  
  'дополнительное': 'card__category_additional',
  'кнопка': 'card__category_button',
  'хард-скил': 'card__category_hard',
}
export class Product {
  protected element: HTMLElement;
  protected events: IEvents;
  protected productId: string;
  protected button: HTMLButtonElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLElement;
  protected text: HTMLElement;
  protected image: HTMLImageElement;


  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.text = this.element.querySelector('.card__text');
    this.title = this.element.querySelector('.card__title');
    this.image = this.element.querySelector('.card__image');
    this.price = this.element.querySelector('.card__price');
    this.category = this.element.querySelector('.card__category');
    this.button = this.element.querySelector('.card__button');

    if (this.button) {
      this.button.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('product:add', { id: this.productId });
      });
    }

    this.element.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.events.emit('product:click', { id: this.productId });
    });
  }

  render(data: IProduct) {
    if (this.text) {
        this.text.textContent = data.description;
    }

    this.title.textContent = data.title;

    if (this.category) {
      this.category.textContent = data.category;
      this.category.classList.add(styles[data.category]);
    }

    this.price.textContent = data.price ? `${data.price} синапсов` : 'Бесценно';
    this.productId = data.id;

    if (this.image) {
      this.image.src = data.image;
    }

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