import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Category, ProductType } from '../../../enums/enums';

interface FormData {
  type: string;
  category: string;
}

interface IProps {
  isOpen: boolean;
  handleClose: any;
  onSubmit: any;
}

export const ExpensesModalForm: React.FC<IProps> = ({ isOpen, handleClose, onSubmit }) => {
  const { control, handleSubmit } = useForm<FormData>();

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add item</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ m: 1 }}>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value={ProductType.EXPENSES}>Expense</MenuItem>
                  <MenuItem value={ProductType.INCOME}>Income</MenuItem>
                </Select>
              )}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value={Category.FOOD}>Jídlo</MenuItem>
                  <MenuItem value={Category.TRAVEL}>Cestování</MenuItem>
                  <MenuItem value={Category.FREE_TIME}>Volný čas</MenuItem>
                </Select>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
