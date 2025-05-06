import { TFormState } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class OrderForm {
  protected element: HTMLElement;
  protected events: IEvents;
  protected card: HTMLButtonElement;
  protected cash: HTMLButtonElement;
  protected address: HTMLInputElement;
  protected submit: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);
    
    this.card = this.element.querySelector('button[name=card]');
    this.cash = this.element.querySelector('button[name=cash]');

    this.card.addEventListener('click', (evt) => {
      evt.stopPropagation();

      this.events.emit('orderform:card');
    });
  
    this.cash.addEventListener('click', (evt) => {
      evt.stopPropagation();

      this.events.emit('orderform:cash');
    });

    this.address = this.element.querySelector('input[name=address]');

    this.address.addEventListener('input', (evt) => {
      const target = evt.target as HTMLInputElement;
      this.events.emit('orderform:address', { value: target.value });
    });

    this.submit = this.element.querySelector('.order__button');

    this.submit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.events.emit('orderform:next');
    });

  }

  set valid(value: boolean) {
    this.submit.disabled = !value;
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
    this.cash.classList.remove('button_alt-active');
    this.card.classList.remove('button_alt-active');
    this.address.value = "";
  }

  render(state: TFormState, payment: string) {
    const { valid } = state;
    this.valid = valid;

    this.payment = payment;

    return this.element;
  }

}