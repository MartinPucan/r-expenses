import React, { useState } from 'react';
import { useAuth } from '../contexts/Auth/AuthContext';
import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../components/Header';
import CardItem from '../components/Card/CardItem';
import Typography from '@mui/material/Typography';
import { IExpense } from '../types/types';
import { items } from '../data/data';
import { ExpensesModalForm } from '../components/Form/Expenses/ExpensesModalForm';

const Homepage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenAddItemForm = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleDeleteItem = (id: string) => {};

  const renderItems = (items: any) => {
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

    return items.map((item: IExpense, index: number) => (
      <Grid item key={`${item.id}-${index}`}>
        <CardItem
          amount={item.amount}
          currency={item.currency}
          title={item.title}
          createdAt={item.createdAt}
          category={item?.category}
          handleDelete={handleDeleteItem(item.id)}
        />
      </Grid>
    ));
  };

  return (
    <Container>
      <Header user={currentUser} isUserLogged={isAuthenticated} />
      <header style={{ margin: '1rem', textAlign: 'right' }}>
        <Button variant="contained" onClick={handleOpenAddItemForm}>
          Add item
        </Button>
        <ExpensesModalForm isOpen={isModalOpen} handleClose={handleClose} />
      </header>
      <Container sx={{ padding: '2rem', border: '1px solid #b3b3b3', borderRadius: '10px', marginBottom: '1rem' }}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
          Income
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderItems(items.income)}
        </Grid>
      </Container>
      <Container sx={{ padding: '2rem', border: '1px solid #b3b3b3', borderRadius: '10px' }}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
          Expenses
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderItems(items.expenses)}
        </Grid>
      </Container>
    </Container>
  );
};

export default Homepage;
