import { IEvents } from "./base/events";
import { Form } from "./base/Form";

export class ContactsForm extends Form<{}> {
  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events);
  }
}