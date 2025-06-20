import { createReducer, on } from '@ngrx/store';
import { BagProduct } from '../../models/bag-product.model';
import { addProduct } from './bag-products.action';

export const initialState: Array<BagProduct> = JSON.parse(
  localStorage.getItem('bagProducts') || '[]'
);

export const bagProductsReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    const updated = state.map((p) =>
      p.id === product.id
        ? { ...p, quantity: Number(p.quantity) + Number(product.quantity) }
        : p
    );

    const exists = state.some((p) => p.id === product.id);

    const finalState = exists ? updated : [...state, product];

    localStorage.setItem('bagProducts', JSON.stringify(finalState));
    return finalState;
  })
  // on(delProduct, (state, { product }) => {
  //   const updated = state;
  //   return updated;
  // })
);
