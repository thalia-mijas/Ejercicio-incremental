import { createAction } from '@ngrx/store';
import { BagProduct } from '../../models/bag-product.model';

export const addProduct = createAction(
  '[Bag Component] Add Product',
  (product: BagProduct) => ({ product })
);

export const delProduct = createAction(
  '[Bag Component] Del Product',
  (product: BagProduct) => ({ product })
);
