import React from 'react';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PieChartBasic } from '../Charts/PieChartBasic';

interface IProps {
  data: any;
}

export const OverviewCont: React.FC<IProps> = ({ data }) => {
  return (
    <Container sx={{ padding: '2rem', border: '1px solid #b3b3b3', borderRadius: '10px', marginBottom: 5 }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: '.5rem' }}>
        Charts overview
      </Typography>
      <Box>
        <PieChartBasic data={data} />
      </Box>
    </Container>
  );
};
