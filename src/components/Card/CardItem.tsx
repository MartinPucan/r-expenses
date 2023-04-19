import React from 'react';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Chip, IconButton } from '@mui/material';
import { getCategoryConfig, getPriceWithCurrency } from '../../utils';
import { useItems } from '../../utils/dataService';
import { Items } from '../../types/types';

interface IProps {
  data: {
    id: string;
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    category?: string;
  };
  type: keyof Items;
}

const CardItem: React.FC<IProps> = ({ data, type }) => {
  const { id, title, amount, currency, createdAt, category } = data;

  const { deleteItemHandler } = useItems();

  const renderChip = (category?: string) => {
    if (!category) {
      return;
    }

    const categoryConfig = getCategoryConfig(category);
    if (!categoryConfig) {
      return;
    }

    const { title: categoryTitle, color: categoryColor } = categoryConfig;

    return <Chip label={categoryTitle} variant="outlined" sx={{ backgroundColor: categoryColor }} />;
  };

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
            <div>{title}</div>
            <div>{getPriceWithCurrency(amount, currency)}</div>
          </Box>
          <Typography sx={{ marginTop: 1, marginBottom: '.5rem', fontSize: '14px' }} color="text.secondary">
            {createdAt.toLocaleString()}
          </Typography>
          {renderChip(category)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.25rem', marginTop: 'auto' }}>
          <IconButton aria-label="delete" onClick={() => deleteItemHandler(type, id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
