import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { RootState } from '../redux/store';
import { AddedCartItems } from '../redux/cartSlice';

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
  orders: OrderType[];
  cart: Item[];
  readonly isAdmin: boolean;
  favorites: string[];
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
  currency: string;
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
  [key: string]: ReviewItemType;
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
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  alertError: (text: ReactNode) => void,
) => Promise<boolean | void>;
export type CategoryType =
  | 'Asic'
  | 'WhatsMiner'
  | 'Antminer'
  | 'AvalonMiner'
  | 'Innosilicon'
  | 'Gold Shell'
  | 'Parts'
  | 'Accessory'
  | 'NVIDIA'
  | 'AMD'
  | 'MSI'
  | 'ASUS'
  | 'GPU';

export type ReviewFormType = { rate: number; value: string };
export type ReviewHandler = (
  type: 'add' | 'delete' | 'change',
  me: UserFirestoreDB,
  isAuth: boolean,
  itemID: string,
  reviews: ReviewItemType[],
  reviewForm: ReviewFormType,
  setReviewForm: Dispatch<SetStateAction<ReviewFormType>>,
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  alertSuccess: (text: React.ReactNode) => void,
  alertError: (text: React.ReactNode) => void,
  idReview?: string,
) => void;

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
export type AddOrderType = (
  userId: string,
  items: AddedCartItems[],
  totalPrice: number,
  name: string,
  phone: string,
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  me?: UserFirestoreDB,
) => void;
export type LeadType = {
  id: string;
  date: string;
  email: string;
  name: string;
  phone: string;
  quiz: QuizType;
  type?: 'order' | 'quiz' | 'call';
};
export type QuizType =
  | {
      answer1: string | number;
      answer2: string | number;
      answer3: string | number;
    }
  | {};
export type PostType = {
  id: string;
  image: string;
  title: string;
  text: string;
  like: string[];
  viewing: number;
  date: string;
  section: 'news' | 'post';
};
export type FieldType = {
  field: string;
  value: string | number;
  type: string;
  error: boolean;
};
