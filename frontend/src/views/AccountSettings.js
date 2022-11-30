import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const { state } = useContext(Store);
  const { customerInfo } = state;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/editinfo');
  };
  return (
    <div className="fixcenter">
      <Helmet>
        <title>Account Settings</title>
      </Helmet>
      <Card sx={{ width: 700 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom mt={4} mb={13} ml={2}>
            Account Settings
          </Typography>
          <Typography variant="h5" mb={2} ml={2}>
            Name: {customerInfo.name}
          </Typography>
          <Typography variant="h5" mb={2} ml={2}>
            Email Address: {customerInfo.email}
          </Typography>
          <Typography variant="h5" ml={2} mb={5}>
            Username: {customerInfo.username}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack ml={2} mb={2}>
            <Button variant="contained" size="medium" onClick={handleEdit}>
              Edit
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
