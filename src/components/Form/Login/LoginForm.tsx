import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/Auth/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { logIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data: FormData) => logIn(data);

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
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...register('password', { required: true })}
          error={!!errors.password}
          label="Password"
          sx={{ maxWidth: 235 }}
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

export default LoginForm;
