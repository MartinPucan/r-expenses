import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import { useAuth } from '../../contexts/Auth/AuthContext';

interface IProps {
  user: any;
  isUserLogged: boolean;
}

export const Header: React.FC<IProps> = ({ user, isUserLogged = false }) => {
  const { logOut } = useAuth();

  const handleLogout = () => logOut();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '2rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expenses
          </Typography>
          {isUserLogged && <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>{user.email}</div>}
          {isUserLogged ? (
            <Button variant="outlined" style={{ color: 'white' }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outlined">
              <Link to={PATH.LOGIN} style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
