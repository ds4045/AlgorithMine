import { ThunkDispatch } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export type CurrencyData = {
  [key: string]: any;
};

export type UserFirestoreDB = {
  name: string;
  surname: string;
  reviews: ReviewsUserType;
  image: string;
  age: string;
  email: string;
  id: string;
  city: string;
  phone: string;
  orders: any[];
  cart: Item[];
  isAdmin: boolean;
  favorites: Item[];
};

export type FieldsUserType = 'name' | 'age' | 'surname' | 'image' | 'city' | 'phone';
export type UserTemplatesPCLoadingType = {
  image: boolean;
  name: boolean;
  surname: boolean;
  age: boolean;
  city: boolean;
  phone: boolean;
};
export type ItemOptionalFields = 'hashrate' | 'payback' | 'profit' | 'expenditure' | 'currency';
export type ItemOptional = {
  hashrate: number;
  payback: number;
  profit: number;
  expenditure: number;
  currency: string[];
};
export type Item = {
  id: string;
  title: string;
  maker: string;
  section: string;
  images: string[];
  price: number;
  optional: ItemOptional;
  description: string;
  descriptionRU: string;
  reviews: ReviewItemType[];
  inStock: boolean;
  sku: number;
};
export type ReviewsUserType = {
  [key: string]: ReviewItemType[];
};
export type ReviewItemType = {
  id: string;
  value: string;
  date: string;
  author: string;
  rate: number;
  image: string;
};
export type toggleFavoritesHandlerType = (
  type: 'add' | 'delete',
  item: Item,
  user: UserFirestoreDB,
  isAuth: boolean,
  dispatch: ThunkDispatch<any, any, any>,
  alertSuccess?: (text: ReactNode) => void,
  alertError?: (text: ReactNode) => void,
) => Promise<boolean | void>;
