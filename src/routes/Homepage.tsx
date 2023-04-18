import React, { useState } from 'react';
import { useAuth } from '../contexts/Auth/AuthContext';
import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../components/Header';
import CardItem from '../components/Card/CardItem';
import Typography from '@mui/material/Typography';
import { Item, Items } from '../types/types';
import { ExpensesModalForm } from '../components/Form/Expenses/ExpensesModalForm';
import { IncomeModalForm } from '../components/Form/Income/IncomeModalForm';
import { v4 as uuid } from 'uuid';
import { useItems } from '../utils/dataService';
import { PieChartBasic } from '../components/Charts/PieChartBasic';

const Homepage = () => {
  const { currentUser, isAuthenticated } = useAuth();

  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState<boolean>(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState<boolean>(false);

  const { items, deleteItemHandler, updateItemHandler, addItemHandler } = useItems();

  const handleSubmit = (data: Record<string, any>, type: keyof Items) => {
    const newItem: Item = {
      id: uuid(),
      amount: data.amount,
      currency: data.currency,
      title: data.title,
      category: data.category,
      createdAt: new Date().toLocaleDateString(),
    };

    addItemHandler(type, newItem);
  };

  const renderItems = (items: any, type: keyof Items) => {
    if (Array.isArray(items) && !items.length) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '1rem',
          }}
        >
          No items.
        </Box>
      );
    }

    return items.map((item: Item, index: number) => (
      <Grid item key={`${item.id}-${index}`}>
        <CardItem
          amount={item.amount}
          currency={item.currency}
          title={item.title}
          createdAt={item.createdAt}
          category={item?.category}
          handleDelete={deleteItemHandler(type, item.id)}
          handleUpdate={updateItemHandler(type, item)}
        />
      </Grid>
    ));
  };

  return (
    <Container>
      <Header user={currentUser} isUserLogged={isAuthenticated} />
      <Container
        sx={{
          padding: '2rem',
          border: '1px solid #b3b3b3',
          borderRadius: '10px',
          marginBottom: '1rem',
          borderLeft: '.5rem solid #98D8AA',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
            Income
          </Typography>
          <Button variant="contained" onClick={() => setIsIncomeDialogOpen(true)}>
            Add item
          </Button>
          <IncomeModalForm
            isOpen={isIncomeDialogOpen}
            handleClose={() => setIsIncomeDialogOpen(false)}
            onSubmit={handleSubmit}
          />
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderItems(items.income, 'income')}
        </Grid>
      </Container>
      <Container
        sx={{
          padding: '2rem',
          border: '1px solid #b3b3b3',
          borderRadius: '10px',
          borderLeft: '.5rem solid #FFA559',
          marginBottom: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
            Expenses
          </Typography>
          <Button variant="contained" onClick={() => setIsExpenseDialogOpen(true)}>
            Add item
          </Button>
          <ExpensesModalForm
            isOpen={isExpenseDialogOpen}
            handleClose={() => setIsExpenseDialogOpen(false)}
            onSubmit={handleSubmit}
          />
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderItems(items.expenses, 'expenses')}
        </Grid>
      </Container>
      <Container sx={{ padding: '2rem', border: '1px solid #b3b3b3', borderRadius: '10px' }}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
          Daily overview
        </Typography>
        <Box>
          <PieChartBasic data={items.income} />
        </Box>
      </Container>
    </Container>
  );
};

export default Homepage;
