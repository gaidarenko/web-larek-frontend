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
  protected buttonAdd: HTMLButtonElement;
  protected buttonDelete: HTMLButtonElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLElement;
  protected text: HTMLElement;
  protected index: HTMLElement;
  protected image: HTMLImageElement;


  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.index = this.element.querySelector('.basket__item-index');
    this.text = this.element.querySelector('.card__text');
    this.title = this.element.querySelector('.card__title');
    this.image = this.element.querySelector('.card__image');
    this.price = this.element.querySelector('.card__price');
    this.category = this.element.querySelector('.card__category');
    this.buttonAdd = this.element.querySelector('.button.card__button');
    this.buttonDelete = this.element.querySelector('.basket__item-delete');

    if (this.buttonDelete) {
      this.buttonDelete.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('basket:delete', { id: this.productId });
      });
    }

    if (this.buttonAdd) {
      this.buttonAdd.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('product:add', { id: this.productId });
      });
    }

    if (this.element.classList.contains('gallery__item')) {
      this.element.addEventListener('click', (evt) => {
        evt.stopPropagation();
        this.events.emit('product:click', { id: this.productId });
      });
    }
  }
  

  render(data: IProduct, canAdd?: boolean, index?: number) {

    if (this.index && index) {
      this.index.textContent = index.toString();
    }

    if (this.buttonAdd) {
      this.buttonAdd.disabled = !canAdd;
    }

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