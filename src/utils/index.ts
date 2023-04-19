import { Category } from '../enums/enums';
import { Item, Items } from '../types/types';

export const getPriceWithCurrency = (price: number, currency: string) => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};

export const getFormattedData = (data: any) => data.map((item: Item) => ({ ...item, amount: Number(item.amount) }));

export const getValuesOfIncomesAndExpenses = (data: Items) => {
  const totalIncomes = data.income.reduce((acc: number, item) => acc + Number(item.amount), 0);
  const totalExpenses = data.expenses.reduce((acc: number, item) => acc + Number(item.amount), 0);

  return [
    {
      value: totalIncomes,
    },
    {
      value: totalExpenses,
    },
  ];
};

export const getCategoryConfig = (category?: string) => {
  if (!category) {
    return undefined;
  }

  switch (category) {
    case Category.FREE_TIME:
      return {
        title: 'Volný čas',
        color: '#F45050',
      };
    case Category.FOOD:
      return {
        title: 'Jídlo',
        color: '#F6BA6F',
      };
    case Category.TRAVEL:
      return {
        title: 'Cestování',
        color: '#BFCCB5',
      };
    default:
      return {
        title: 'Unknown',
        color: 'grey',
      };
  }
};
