import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Store } from '../Store.js';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const { foodCart, customerInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
    localStorage.removeItem('customerInfo');
    localStorage.removeItem('deliveryInfomation');
    localStorage.removeItem('pickupRestaurant');
    localStorage.removeItem('foodItems');
    localStorage.removeItem('paymentOption');
  };

  return (
    <div>
      <div className="heading">
        <Link to="/">Wonderful Meal</Link>
      </div>
      <Box sx={{ float: 'right' }}>
        <Link to="/foodcart">
          <Badge
            badgeContent={foodCart.foodItems.reduce((a, c) => a + c.count, 0)}
            color="secondary"
          >
            <ShoppingCartIcon />
          </Badge>
        </Link>
        {customerInfo ? (
          <div className="accInfo">
            <Button
              size="large"
              variant="contained"
              color="error"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <AccountBoxIcon />
              <Typography ml={1}>{customerInfo.name}</Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to="/accountsettings" style={{ textDecoration: 'none' }}>
                <MenuItem>Account Settings</MenuItem>
              </Link>

              <Link to="/" style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Link>
            </Menu>
          </div>
        ) : (
          <Link to="/signin">
            <Stack mr={20} ml={5} sx={{ display: 'inline-block' }}>
              <Button size="large" variant="contained" color="error">
                Sign In
              </Button>
            </Stack>
          </Link>
        )}
      </Box>
    </div>
  );
}
