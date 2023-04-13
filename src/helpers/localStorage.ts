import { AddedCartItems } from '../redux/cartSlice';

export const loadCartFromLocalStorage = (key: string): AddedCartItems[] => {
  try {
    const serializedCart = localStorage.getItem(key);
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart) as AddedCartItems[];
  } catch (err) {
    return [];
  }
};

export const saveCartToLocalStorage = (cart: AddedCartItems[], key: string) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(key, serializedCart);
  } catch (err) {
    console.error('Error saving cart to local storage:', err);
  }
};
