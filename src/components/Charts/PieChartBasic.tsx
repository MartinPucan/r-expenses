import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, BarProps } from "recharts";
import { Box, Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getFormattedData, getValuesOfIncomesAndExpenses } from '../../utils';
import { Items } from '../../types/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface ChartData {
  value: number;
  fill?: string;
}

interface IProps {
  data: Items;
}

export const PieChartBasic: React.FC<IProps> = ({ data }) => {
  const incomeData = getFormattedData(data.income);
  const expensesData = getFormattedData(data.expenses);

  const totalValues = getValuesOfIncomesAndExpenses(data);

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
        <Paper elevation={1} sx={{ padding: '1rem' }}>
          <Typography variant="h5">Income</Typography>
          <PieChart width={250} height={250}>
            <Pie
              data={incomeData}
              cx={125}
              cy={125}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {incomeData.map((entry: any, index: number) => (
                <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </Paper>
        <Paper elevation={1} sx={{ padding: '1rem' }}>
          <Typography variant="h5">Expenses</Typography>
          <PieChart width={250} height={250}>
            <Pie
              data={expensesData}
              cx={125}
              cy={125}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {expensesData.map((entry: any, index: number) => (
                <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </Paper>
        <Paper elevation={1} sx={{ padding: '1rem' }}>
          <Typography variant="h5">Income / Expenses</Typography>
          <Box sx={{ display: 'grid', placeItems: 'center', marginTop: '3rem' }}>
            <BarChart width={150} height={150} data={totalValues}>
              {/* @ts-ignore */}
              <Bar dataKey="value" fill={ (bar: BarProps<ChartData>) => bar.fill || '#98D8AA' } />
            </BarChart>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
