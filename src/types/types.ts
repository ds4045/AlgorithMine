export type CurrencyData = {
  [key: string]: any;
};

export type UserFirestoreDB = {
  name: string;
  surname: string;
  reviews: ReviewsType[];
  image: string;
  age: string;
  email: string;
  id?: string;
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
  reviews: ReviewsType[];
  inStock: boolean;
  sku: number;
};
export type ReviewsType = {
  id: string;
  value: string;
  date: number;
  author: string;
};
