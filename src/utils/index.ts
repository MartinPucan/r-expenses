import { Category } from '../enums/enums';

export const getPriceWithCurrency = (price: number, currency: string) => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
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
