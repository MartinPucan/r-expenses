import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/Auth/AuthContext';

interface FormData {
  email: string;
  password: string;
  rePassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const { signUp } = useAuth();

  const onSubmit = (data: FormData) => signUp(data);

  const formData = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ m: 1 }}>
        <TextField
          label="Email"
          type="email"
          {...register('email', { required: true })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>

      <Box sx={{ m: 1 }}>
        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>

      <Box sx={{ m: 1 }}>
        <TextField
          label="Verify password"
          type="password"
          {...register('rePassword', {
            required: true,
            validate: (value) => value === formData.rePassword || 'The passwords do not match',
          })}
          error={!!errors.rePassword}
          helperText={errors.rePassword?.message}
        />
      </Box>

      <Box sx={{ m: 1, textAlign: 'right' }}>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
