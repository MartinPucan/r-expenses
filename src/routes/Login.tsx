import { Container } from '@mui/material';
import React from 'react';
import LoginForm from '../components/Form/Login/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'grid', placeItems: 'center' }}>
      <LoginForm />
    </Container>
  );
};

export default Login;
