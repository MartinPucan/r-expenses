import { Category } from '../enums/enums';

export interface Item {
  id: string;
  amount: number;
  currency: string;
  title: string;
  category: Category;
  createdAt: string;
}

export interface Items {
  income: Item[];
  expenses: Item[];
}
