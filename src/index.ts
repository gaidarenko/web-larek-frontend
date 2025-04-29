import { EventEmitter } from './components/base/events';
import { ProductListModel } from './components/ProductListModel';
import { ProductGallery } from './components/ProductGallery';
import { LarekApi } from "./components/LarekApi";
import { API_URL, CDN_URL } from "./utils/constants";

import './scss/styles.scss';
import { Product } from './components/Product';

const events = new EventEmitter();
const productListModel = new ProductListModel(events);

const api = new LarekApi(CDN_URL, API_URL);
const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog'); 

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const gallery = new ProductGallery(document.querySelector('.gallery'));

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