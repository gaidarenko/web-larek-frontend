import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductListModel } from './components/ProductListModel';
import { BasketModel } from './components/BasketModel';
import { OrderInfoModel } from './components/OrderInfoModel';
import { ProductGallery } from './components/ProductGallery';
import { Modal } from './components/Modal';
import { LarekApi } from './components/LarekApi';
import { Basket } from './components/Basket';
import { BasketList } from './components/BasketList';
import { BasketItem } from './components/BasketItem';
import { Success } from './components/Success';
import { API_URL, CDN_URL } from "./utils/constants";
import { Product } from './components/Product';
import { TProductId, IProduct, IOrder } from './types';

const events = new EventEmitter();
const productListModel = new ProductListModel(events);
const basketModel = new BasketModel(events);
const orderInfoModel = new OrderInfoModel();

const api = new LarekApi(CDN_URL, API_URL);
const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog'); 
const productFullTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const productBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

const success = new Success(document.querySelector('#success'), events);
const basket = new Basket(document.querySelector('.header__basket'), events);
const basketList = new BasketList(basketTemplate, events);
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
    return product.render(item);
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

events.on('basket:click', (data) => {
  setBasketListContent();
  modal.open();  
});

events.on('basketlist:buy', (data) => {

  const order: IOrder = {
    payment: orderInfoModel.payment,
    email: orderInfoModel.email,
    phone: orderInfoModel.phone,
    address: orderInfoModel.address,
    total: 0,
    items: []
  };

  order.items = Array.from(basketModel.items);

  basketModel.items.forEach((item) => {
    const product: IProduct = productListModel.getById(item);
  
    if (product.price) {
      order.total += product.price;
    }
  });

  api.orderProducts(order)
    .then(result => {
      console.log(result);
      modal.content = success.render(result.total);
    })
    .catch(err => {
      console.error(err);
    });
  
});

events.on('order:success', (data) => {
  modal.close();
});

events.on('basket:delete', (data: TProductId) => {
  basketModel.delete(data.id);
  setBasketListContent();
});

function setBasketListContent() {
  const products: HTMLElement[] = [];
  let index: number = 1;
  let totalPrice = 0;
  
  basketModel.items.forEach(item => {
    const basketItem = new BasketItem(productBasketTemplate, events);
  
    const product: IProduct = productListModel.getById(item);
  
    if (product.price) {
      totalPrice += product.price;
    }
  
    products.push(basketItem.render(product, index++));
  });  
  
  modal.content = basketList.render(products, totalPrice);
}