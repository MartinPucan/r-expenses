import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/constants/routes";

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

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => logIn(data).then(() => navigate(PATH.HOME));
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
          {...register('password', { required: true })}
          error={!!errors.password}
          helperText={errors.password?.message}
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