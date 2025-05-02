import { TOrderInfo } from "../types";

export class OrderInfoModel implements TOrderInfo {
  protected _payment: string;
  protected _address: string;
  protected _email: string;
  protected _phone: string;

  constructor() {
    this._payment = "online";
    this._email = "test@test.ru";
    this._phone = "+71234567890";
    this._address = "moscow lubianka 1";
  }

  get payment() {
    return this._payment;
  }

  set payment(value: string) {
    this._payment = value;
  }

  get phone() {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get address() {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}