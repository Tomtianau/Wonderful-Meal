import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { fetchError } from '../utils';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect');
  const redirectUrl = redirect ? redirect : '/';
  const { state, dispatch } = useContext(Store);
  const { customerInfo } = state;
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are different, please try again!');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        username,
        password,
        email,
      });
      dispatch({ type: 'SIGN_IN', payload: data });
      localStorage.setItem('customerInfo', JSON.stringify(data));
      navigate(redirectUrl || '/');
    } catch (error) {
      alert(fetchError(error));
    }
  };
  useEffect(() => {
    if (customerInfo) {
      navigate(redirectUrl);
    }
  }, [customerInfo, navigate, redirectUrl]);

  return (
    <div className="fixcenter">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Card sx={{ width: 700 }}>
        <CardContent>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="h3"
            gutterBottom
            mt={2}
            mb={4}
          >
            Sign Up
          </Typography>
          <Typography variant="h6" gutterBottom mb={1}>
            Name:
          </Typography>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={1}>
            Email:
          </Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={1}>
            Username:
          </Typography>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={1}>
            Password:
          </Typography>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={1}>
            Confirm Password:
          </Typography>
          <TextField
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Stack ml={29}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 200 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Stack>
        </CardActions>
        <CardContent>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirectUrl}`}>Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
