import { useEffect, useState } from 'react';
import { Category } from '../enums/enums';

interface Item {
  id: string;
  amount: number;
  currency: string;
  title: string;
  category: Category;
  createdAt: string;
}

interface Items {
  income: Item[];
  expenses: Item[];
}

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const addItem = (type: keyof Items, item: Item) => {
  const items = getFromLocalStorage(type) as Item[] | null;
  const newItems = items ? [...items, item] : [item];
  saveToLocalStorage(type, newItems);
};

const deleteItem = (type: keyof Items, id: string) => {
  const items = getFromLocalStorage(type) as Item[] | null;
  if (items) {
    const updatedItems = items.filter((item) => item.id !== id);
    saveToLocalStorage(type, updatedItems);
  }
};

export const useItems = () => {
  const [items, setItems] = useState<Items>({ income: [], expenses: [] });

  useEffect(() => {
    const income = getFromLocalStorage('income') || [];
    const expenses = getFromLocalStorage('expenses') || [];

    setItems({ income, expenses });
  }, []);

  const addItemHandler = (type: keyof Items, item: Item) => {
    addItem(type, item);
    setItems((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], item],
    }));
  };

  const deleteItemHandler = (type: keyof Items, id: string) => {
    deleteItem(type, id);
    setItems((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((item) => item.id !== id),
    }));
  };

  return { items, addItemHandler, deleteItemHandler };
};
