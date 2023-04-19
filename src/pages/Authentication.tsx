import React, { ReactNode, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoginForm from '../components/Form/Login/LoginForm';
import RegisterForm from '../components/Form/Register/RegisterForm';
import { useAuth } from "../contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Authentication = () => {
  const [value, setValue] = useState(0);

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH.HOME} />;
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'grid', placeItems: 'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm />
      </TabPanel>
    </Box>
  );
};
