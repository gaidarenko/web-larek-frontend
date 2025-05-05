import { TOrderInfo } from "../types";

export class OrderInfoModel implements TOrderInfo {
  protected _payment: string;
  protected _address: string;
  protected _email: string;
  protected _phone: string;

  constructor() {
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
  }

  isPaymentValid(): boolean {
    return !!this._payment;
  }

  get phone() {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  isPhoneValid(): boolean {
    return !!this._phone;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  isEmailValid(): boolean {
    return !!this._email;
  }

  get address() {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  isAddressValid(): boolean {
    return !!this._address;
  }
}