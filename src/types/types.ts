export type CurrencyData = {
  [key: string]: any;
};
export type ReviewsType = {
  id: string;
  value: string;
  date: number;
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
