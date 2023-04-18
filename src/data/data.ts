import { Category } from "../enums/enums";

export const items = {
  income: [
    {
      id: '1',
      amount: 22222,
      currency: 'CZK',
      title: 'Vyplata',
      category: Category.FREE_TIME,
      createdAt: 'Tuesday, Apr 18, 2023',
    },
    {
      id: '2',
      amount: 222,
      currency: 'CZK',
      title: 'Darek',
      category: Category.TRAVEL,
      createdAt: 'Tuesday, Apr 18, 2023',
    },
  ],
  expenses: [
    {
      id: '1',
      amount: 1220,
      currency: 'CZK',
      title: 'Vecere',
      category: Category.FOOD,
      createdAt: 'Tuesday, Apr 18, 2023',
    },
    {
      id: '2',
      amount: 1220,
      currency: 'CZK',
      title: 'Obed',
      category: Category.FOOD,
      createdAt: 'Monday, Apr 10, 2023',
    },
  ],
};