import React from 'react';
import { Box } from '@mui/material';

interface IProps {
  title: string;
}

export const NoDataCont: React.FC<IProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem',
      }}
    >
      {title}
    </Box>
  );
};
