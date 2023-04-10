type KeyType = any;

export const loadCartFromLocalStorage = (key: KeyType): any => {
  try {
    const serializedCart = localStorage.getItem(key);
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart) as any;
  } catch (err) {
    return undefined;
  }
};

export const saveCartToLocalStorage = (cart: any, key: KeyType) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(key, serializedCart);
  } catch (err) {
    console.error('Error saving cart to local storage:', err);
  }
};
