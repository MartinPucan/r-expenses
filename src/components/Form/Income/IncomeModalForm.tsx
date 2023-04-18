import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Category, Currency } from '../../../enums/enums';
import { currencies } from '../../../constants/formFields';
import { v4 as uuid } from 'uuid';
import { useItems } from '../../../utils/dataService';
import { Item } from '../../../types/types';

interface FormData {
  title: string;
  amount: number;
  currency: string;
  category: string;
}

interface IProps {
  isOpen: boolean;
  handleClose: any;
  onSubmit: any;
}

export const IncomeModalForm: React.FC<IProps> = ({ isOpen, handleClose, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add item</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ m: 1 }}>
            <TextField
              label="Title"
              type="title"
              {...register('title', { required: true })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              label="Amount"
              type="amount"
              {...register('amount', { required: true })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              id="currency"
              select
              label="Select"
              defaultValue={Currency.CZK}
              {...register('currency', { required: true })}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              id="outlined-select-category"
              select
              label="Select"
              defaultValue=""
              {...register('category', { required: true })}
              sx={{ minWidth: 186 }}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value={Category.FOOD}>Jídlo</MenuItem>
              <MenuItem value={Category.TRAVEL}>Cestování</MenuItem>
              <MenuItem value={Category.FREE_TIME}>Volný čas</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
