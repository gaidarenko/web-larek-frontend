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
//  protected button: HTMLButtonElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLElement;
  protected image: HTMLImageElement;


  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.title = this.element.querySelector('.card__title');
    this.image = this.element.querySelector('.card__image');
    this.price = this.element.querySelector('.card__price');
    this.category = this.element.querySelector('.card__category');

    // console.log(this.element);
/*
    this.button = this.element.querySelector('.gallery__item');
*/
    this.element.addEventListener('click', () => {
      this.events.emit('product:click', { product: this });
    });
  }

  render(data: IProduct) {
    this.title.textContent = data.title;
    this.category.textContent = data.category;
    this.category.classList.add(styles[data.category]);
    this.price.textContent = data.price ? `${data.price} синапсов` : 'Бесценно';
    this.productId = data.id;
    this.image.src = data.image;

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