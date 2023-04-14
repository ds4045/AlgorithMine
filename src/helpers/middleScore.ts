import { Item } from '../types/types';

export const middleScore = (item: Item) =>
  Math.round(item.reviews.reduce((acc, curr) => acc + curr?.rate, 0) / item.reviews.length);
