import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';

export default function Delivery() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { deliveryInfomation, customerInfo } = state;
  const [firstName, setFirstName] = useState(
    deliveryInfomation.firstName || ''
  );
  const [lastName, setLastName] = useState(deliveryInfomation.lastName || '');
  const [street, setStreet] = useState(deliveryInfomation.street || '');
  const [suburb, setSuburb] = useState(deliveryInfomation.suburb || '');
  const [stateName, setStateName] = useState(
    deliveryInfomation.stateName || ''
  );
  const [postcode, setPostcode] = useState(deliveryInfomation.postcode || '');
  const [country, setCountry] = useState(deliveryInfomation.country || '');
  const [phone, setPhone] = useState(deliveryInfomation.phone || '');

  useEffect(() => {
    if (!customerInfo) {
      navigate('/signin');
    }
  }, [customerInfo, navigate]);

  const handleContinue = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_DELIVERY_INFOMATION',
      payload: {
        firstName,
        lastName,
        street,
        suburb,
        stateName,
        postcode,
        country,
        phone,
      },
    });
    localStorage.setItem(
      'deliveryInfomation',
      JSON.stringify({
        firstName,
        lastName,
        street,
        suburb,
        stateName,
        postcode,
        country,
        phone,
      })
    );
    navigate('/payment');
  };

  return (
    <div className="delivery">
      <Helmet>
        <title>Delivery</title>
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
            Delivery Infomation
          </Typography>
          <Typography variant="h6" gutterBottom mb={1}>
            First Name:
          </Typography>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Last Name:
          </Typography>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            variant="outlined"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Street:
          </Typography>
          <TextField
            required
            fullWidth
            id="street"
            label="Street"
            variant="outlined"
            defaultValue={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Suburb:
          </Typography>
          <TextField
            required
            fullWidth
            id="suburb"
            label="Suburb"
            variant="outlined"
            defaultValue={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            State:
          </Typography>
          <TextField
            required
            fullWidth
            id="stateName"
            label="State"
            variant="outlined"
            defaultValue={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Postcode:
          </Typography>
          <TextField
            required
            fullWidth
            id="postcode"
            label="Postcode"
            variant="outlined"
            defaultValue={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Country:
          </Typography>
          <TextField
            required
            fullWidth
            id="country"
            label="Country"
            variant="outlined"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Phone:
          </Typography>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone"
            variant="outlined"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Stack ml={29} mb={2}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 200 }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
