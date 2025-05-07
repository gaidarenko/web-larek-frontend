import { TFormState } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class ContactsForm {
  protected element: HTMLElement;
  protected events: IEvents;
  protected email: HTMLInputElement;
  protected phone: HTMLInputElement;
  protected submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);

    this._errors = this.element.querySelector('.form__errors');

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

  set errors(value: string) {
    this._errors.textContent = value;
  }

  clear() {
    this.email.value = "";
    this.phone.value = "";
    this.errors = null;
  }

  render(state: TFormState) {
    const { valid, errors } = state;

    this.valid = valid;
    this.errors = errors;

    return this.element;
  }

}