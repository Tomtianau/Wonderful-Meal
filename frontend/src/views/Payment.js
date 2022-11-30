import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState('paypal');
  const { state, dispatch } = useContext(Store);
  const { customerInfo } = state;
  useEffect(() => {
    if (!customerInfo) {
      navigate('/signin');
    }
  }, [customerInfo, navigate]);
  const handleSelect = (e) => {
    setPaymentOption(e.target.value);
  };
  const handleContinue = (e) => {
    e.preventDefault();
    dispatch({ type: 'SELECT_PAYMENT_OPTION', payload: paymentOption });
    localStorage.setItem('paymentOption', paymentOption);
    navigate('/orderinfomation');
  };

  return (
    <div className="fixcenter">
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Card sx={{ width: 700 }}>
        <CardContent>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="h3"
            gutterBottom
            mt={4}
            mb={13}
          >
            Payment Options
          </Typography>
          <Stack ml={5}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Payment Options
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={paymentOption}
                onChange={handleSelect}
              >
                <FormControlLabel
                  value="PayPal"
                  control={<Radio size="medium" />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="GooglePay"
                  control={<Radio size="medium" />}
                  label="GooglePay"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack ml={5} mb={4} mt={5}>
            <Button variant="contained" onClick={handleContinue}>
              Continue Ordering
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
