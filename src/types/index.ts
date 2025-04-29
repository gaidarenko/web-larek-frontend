export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

// export type iProductInfo = Pick<IProduct, 'id' | 'title'>;