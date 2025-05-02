import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Success {
  protected element: HTMLElement;
  protected events: IEvents;
  protected description: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);

    this.description = this.element.querySelector('.order-success__description');
    this.button = this.element.querySelector('.order-success__close');

    this.button.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.events.emit('order:success');
    })
  }

  render(total: number) {
    this.description.textContent = `Списано ${total} синапсов`;
    return this.element;
  }

}