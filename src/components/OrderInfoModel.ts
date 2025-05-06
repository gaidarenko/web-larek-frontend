import { TOrderInfo } from "../types";
import { IEvents } from "./base/events";

export class OrderInfoModel implements TOrderInfo {
  protected events: IEvents;
  protected _payment: string;
  protected _address: string;
  protected _email: string;
  protected _phone: string;

  constructor(events: IEvents) {
    this.events = events;
    this.clear();
  }

  clear() {
    this._email = null;
    this._address = null;
    this._payment = null;
    this._phone = null;
  }

  get payment() {
    return this._payment;
  }

  set payment(value: string) {
    this._payment = value;
    this.events.emit('orderinfomodel:change');
  }

  isPaymentValid(): boolean {
    return !!this._payment;
  }

  get phone() {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
    this.events.emit('orderinfomodel:change');
  }

  isPhoneValid(): boolean {
    return !!this._phone;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
    this.events.emit('orderinfomodel:change');
  }

  isEmailValid(): boolean {
    return !!this._email;
  }

  get address() {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
    this.events.emit('orderinfomodel:change');
  }

  isAddressValid(): boolean {
    return !!this._address;
  }
}