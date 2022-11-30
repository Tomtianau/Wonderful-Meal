import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Store } from '../Store.js';
import { fetchError } from '../utils.js';

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { state, dispatch } = useContext(Store);
  const { customerInfo } = state;
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect');
  const redirectUrl = redirect ? redirect : '/';

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        username,
        password,
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
        <title>Sign In</title>
      </Helmet>
      <Card sx={{ width: 700 }}>
        <CardContent>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="h3"
            gutterBottom
            mt={2}
            mb={7}
          >
            SIGN IN
          </Typography>
          <Typography variant="h6" gutterBottom mb={2}>
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
          <Typography variant="h6" gutterBottom mb={2} mt={3}>
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
        </CardContent>
        <CardActions>
          <Stack ml={29}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 200 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Stack>
        </CardActions>
        <CardContent>
          <Typography sx={{ textAlign: 'center' }}>
            Not yet registered?{' '}
            <Link to={`/signup?redirect=${redirectUrl}`}>
              Create your account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
