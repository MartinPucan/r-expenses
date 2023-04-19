import React from 'react';
import { useAuth } from '../contexts/Auth/AuthContext';
import { Container } from '@mui/material';
import { Header } from '../components/Header';
import { useItems } from '../utils/dataService';
import { ExpensesCont } from '../components/Containers/Expenses.cont';
import { IncomeCont } from '../components/Containers/Income.cont';
import { OverviewCont } from '../components/Containers/Overview.cont';

const Homepage = () => {
  const { currentUser, isAuthenticated } = useAuth();

  const { items } = useItems();

  return (
    <Container>
      <Header user={currentUser} isUserLogged={isAuthenticated} />
      <IncomeCont data={items.income} />
      <ExpensesCont data={items.expenses} />
      <OverviewCont data={items} />
    </Container>
  );
};

export default Homepage;
