import React, { useState } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ExpensesModalForm } from '../Form/Expenses/ExpensesModalForm';
import { Item } from '../../types/types';
import CardItem from '../Card/CardItem';
import { NoDataCont } from './NoData.cont';

interface IProps {
  data: Item[];
}

export const ExpensesCont: React.FC<IProps> = ({ data }) => {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState<boolean>(false);

  const renderExpenseItems = (items: any) => {
    if (Array.isArray(items) && !items.length) {
      return <NoDataCont title="No items." />;
    }

    return items.map((item: Item) => (
      <Grid item key={item.id}>
        <CardItem data={item} type="expenses" />
      </Grid>
    ));
  };

  return (
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
        <ExpensesModalForm isOpen={isExpenseDialogOpen} handleClose={() => setIsExpenseDialogOpen(false)} />
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {renderExpenseItems(data)}
      </Grid>
    </Container>
  );
};
