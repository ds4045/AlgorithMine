import { getCurrentDate } from '../helpers/getCurrentDate';
import { isAuthTrue } from '../redux/authSlice';
import { pushOrderedItems } from '../redux/cartSlice';
import { AddOrderType } from '../types/types';
import { addDataForDB, updateForFirestore } from './firebaseAPI';

export const addOrderToDB: AddOrderType = async (
  userId,
  items,
  totalPrice,
  name,
  phone,
  dispatch,
  me,
) => {
  const orderedItems: OrderedItemsType[] = items.map((el) => ({
    itemId: el.id,
    count: el.count,
    price: el.price,
  }));
  const newOrder: OrderType = {
    orderNumber: Date.now(),
    userId,
    orderedItems,
    date: getCurrentDate(),
    totalPrice,
    name,
    phone,
    completed: false,
  };
  const resOrders = await addDataForDB('orders', newOrder);
  let resUsers;
  if (userId && me?.orders) {
    const newUserOrders = [...me.orders, newOrder];
    resUsers = await updateForFirestore('users', userId, 'orders', newUserOrders);
    resUsers && dispatch(isAuthTrue({ ...me, orders: newUserOrders }));
  }
  resOrders && dispatch(pushOrderedItems());
  return resOrders && resUsers;
};
export type OrderType = {
  orderNumber: number;
  userId: string;
  orderedItems: OrderedItemsType[];
  date: string;
  totalPrice: number;
  name: string;
  phone: string;
  completed: boolean;
};
export type OrderedItemsType = {
  itemId: string;
  count: number;
  price: number;
};
