import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchError } from '../utils.js';

export default function EditInfo() {
  const { state, dispatch } = useContext(Store);
  const { customerInfo } = state;
  const navigate = useNavigate();
  const [name, setName] = useState(customerInfo.name);
  const [email, setEmail] = useState(customerInfo.email);
  const [username, setUsername] = useState(customerInfo.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCancel = () => {
    navigate('/accountsettings');
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are different, please try again!');
      return;
    }
    try {
      const { data } = await axios.put(
        '/api/users/editinfo',
        {
          name,
          email,
          username,
          password,
        },
        {
          headers: { Authorization: `Bearer ${customerInfo.token}` },
        }
      );
      dispatch({ type: 'SIGN_IN', payload: data });
      localStorage.setItem('customerInfo', JSON.stringify(data));
      setOpen(true);
    } catch (error) {
      alert(fetchError(error));
    }
  };

  return (
    <div className="fixcenter">
      <Helmet>
        <title>Edit Info</title>
      </Helmet>
      <Card sx={{ width: 700 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom mb={7} mt={3} ml={2}>
            PERSONAL INFO
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            mb={3}
            ml={2}
          >
            Name:
            <TextField
              required
              id="name"
              variant="standard"
              defaultValue={name}
              sx={{ marginLeft: '20px' }}
              onChange={(e) => setName(e.target.value)}
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            mb={3}
            ml={2}
          >
            Email Address:
            <TextField
              required
              id="email"
              variant="standard"
              defaultValue={email}
              sx={{ marginLeft: '20px' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            mb={3}
            ml={2}
          >
            Username:
            <TextField
              required
              id="username"
              variant="standard"
              defaultValue={username}
              sx={{ marginLeft: '20px' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            ml={2}
            mb={3}
          >
            Password:
            <TextField
              required
              id="password"
              variant="standard"
              sx={{ marginLeft: '20px' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            ml={2}
            mb={7}
          >
            Confirm Password:
            <TextField
              required
              id="confirmPassword"
              variant="standard"
              sx={{ marginLeft: '20px' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={6} ml={3} mb={2} direction="row">
            <Button variant="outlined" size="medium" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" size="medium" onClick={handleSave}>
              Save
            </Button>
          </Stack>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Your account infomation is updated successfully!
            </Alert>
          </Snackbar>
          ;
        </CardActions>
      </Card>
    </div>
  );
}
