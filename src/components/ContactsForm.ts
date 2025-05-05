import { TFormState } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class ContactsForm {
  protected element: HTMLElement;
  protected events: IEvents;
  protected email: HTMLInputElement;
  protected phone: HTMLInputElement;
  protected submit: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);

    this.phone = this.element.querySelector('input[name=phone]');
    this.phone.addEventListener('input', (evt) => {
      const target = evt.target as HTMLInputElement;
      this.events.emit('contactsform:phone', { value: target.value });
    });
    
    this.email = this.element.querySelector('input[name=email]');

    this.email.addEventListener('input', (evt) => {
      const target = evt.target as HTMLInputElement;
      this.events.emit('contactsform:email', { value: target.value });
    });

    this.submit = this.element.querySelector('button[type=submit]');

    this.submit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.events.emit('contactsform:pay');
    });

  }

  set valid(value: boolean) {
    this.submit.disabled = !value;
  }

  render(state: TFormState) {
    const { valid } = state;
    this.valid = valid;
    return this.element;
  }

}