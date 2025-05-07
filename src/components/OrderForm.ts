import { Form } from "./base/Form";
import { IEvents } from "./base/events";

interface IOrderFormData {
  payment: string;
}

export class OrderForm extends Form<IOrderFormData>{
  protected card: HTMLButtonElement;
  protected cash: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events);
    
    this.card = this.container.querySelector('button[name=card]');
    this.cash = this.container.querySelector('button[name=cash]');

    this.card.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.events.emit('orderform:card');
    });
  
    this.cash.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.events.emit('orderform:cash');
    });
  }

  set payment(value: string) {
    this.cash.classList.remove('button_alt-active');
    this.card.classList.remove('button_alt-active');

    if (value === 'online') {
      this.card.classList.add('button_alt-active');
    } else if (value === 'cash') {
      this.cash.classList.add('button_alt-active');
    }
  }

  clear() {
    super.clear();
    this.cash.classList.remove('button_alt-active');
    this.card.classList.remove('button_alt-active');
  }
}