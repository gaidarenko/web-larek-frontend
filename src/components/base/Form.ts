import { IEvents } from "./events";
import { TFormState } from "../../types";
import { cloneTemplate } from "../../utils/utils";

export class Form<T> {
  protected container: HTMLFormElement;
  protected events: IEvents;
  
  protected submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.container = cloneTemplate(template) as HTMLFormElement;

    this._errors = this.container.querySelector('.form__errors');
    this.submit = this.container.querySelector('button[type=submit]');

    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  protected onInputChange(field: string, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field,
      value
    });
  }

  set valid(value: boolean) {
    this.submit.disabled = !value;
  }

  set errors(value: string) {
    this._errors.textContent = value;
  }

  clear() {
    this.container.reset();
    this.errors = null;
  }

  render(state: Partial<T> & TFormState) {
    const {valid, errors, ...inputs} = state;

    this.valid = valid;
    this.errors = errors;
    Object.assign(this, inputs);

    return this.container;
  }
}