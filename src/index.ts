import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductListModel } from './components/ProductListModel';
import { BasketModel } from './components/BasketModel';
import { ProductGallery } from './components/ProductGallery';
import { Modal } from './components/Modal';
import { LarekApi } from './components/LarekApi';
import { Basket } from './components/Basket';
import { API_URL, CDN_URL } from "./utils/constants";
import { Product } from './components/Product';
import { TProductId } from './types';

const events = new EventEmitter();
const productListModel = new ProductListModel(events);
const basketModel = new BasketModel(events);

const api = new LarekApi(CDN_URL, API_URL);
const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog'); 
const productFullTemplate: HTMLTemplateElement = document.querySelector('#card-preview');

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

const basket = new Basket(document.querySelector('.header__basket'), events);
const gallery = new ProductGallery(document.querySelector('.gallery'));
const modal = new Modal(document.querySelector('#modal-basket'));

// Получаем лоты с сервера
api.getProductList()
  .then(result => {
    productListModel.items = result;
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

events.on('productlist:changed', (data) => {
  const products: HTMLElement[] = productListModel.items.map(item => {
    const product = new Product(productTemplate, events);
    return product.render(item); //place.append(
  });

  gallery.render(products);
})

events.on('product:click', (data: TProductId) => {
  const product = new Product(productFullTemplate, events);
  modal.content = product.render(productListModel.getById(data.id));
  modal.open();
});

events.on('product:add', (data: TProductId) => {
  basketModel.add(data.id);
  modal.close();
});

events.on('basket:change', (data) => {
  basket.counter = basketModel.count;
});