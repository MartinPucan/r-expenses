import React from 'react';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Chip, IconButton } from '@mui/material';
import { getCategoryConfig, getPriceWithCurrency } from '../../utils';

interface IProps {
  title: string;
  amount: number;
  currency: string;
  createdAt: any;
  category?: string;
  handleDelete: any;
}

const CardItem: React.FC<IProps> = ({ title, amount, currency, createdAt, category, handleDelete }) => {
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
    <Card sx={{ minWidth: 250, minHeight: 195 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Box sx={{ minHeight: 120 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
            <div>{title}</div>
            <div>{getPriceWithCurrency(amount, currency)}</div>
          </Box>
          <Typography sx={{ marginTop: 1, marginBottom: '.5rem' }} color="text.secondary">
            {createdAt.toLocaleString()}
          </Typography>
          {renderChip(category)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem', marginTop: 'auto' }}>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleDelete}>
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;