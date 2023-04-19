import React, { useState } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IncomeModalForm } from '../Form/Income/IncomeModalForm';
import { Item } from '../../types/types';
import CardItem from '../Card/CardItem';
import { NoDataCont } from './NoData.cont';

interface IProps {
  data: any;
}

export const IncomeCont: React.FC<IProps> = ({ data }) => {
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState<boolean>(false);

  const renderIncomeItems = (items: any) => {
    if (Array.isArray(items) && !items.length) {
      return <NoDataCont title="No items." />;
    }

    return items.map((item: Item) => (
      <Grid item key={item.id}>
        <CardItem data={item} type="income" />
      </Grid>
    ));
  };

  return (
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
        <IncomeModalForm isOpen={isIncomeDialogOpen} handleClose={() => setIsIncomeDialogOpen(false)} />
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {renderIncomeItems(data)}
      </Grid>
    </Container>
  );
};
