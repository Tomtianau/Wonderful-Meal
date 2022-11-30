import '../index.css';
import { Button, Stack, Box } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import MainCourse from './Menu/MainCourse.js';
import SideDishes from './Menu/SideDishes.js';
import Drinks from './Menu/Drinks.js';
import { Helmet } from 'react-helmet-async';

export default function Homepage() {
  const navigate = useNavigate();
  const chooseMainCourse = () => {
    navigate('/menu/mainCourse');
  };
  const chooseSideDishes = () => {
    navigate('/menu/sideDishes');
  };
  const chooseDrinks = () => {
    navigate('/menu/drinks');
  };
  return (
    <div>
      <Helmet>
        <title>Wonderful Meal</title>
      </Helmet>
      <h1 className="menu">Food Menu</h1>

      <Box justifyContent="center" display="flex">
        <Stack spacing={16} direction="row" mb={4}>
          <Button variant="contained" onClick={chooseMainCourse}>
            Main Course
          </Button>
          <Button variant="contained" onClick={chooseSideDishes}>
            Side Dishes
          </Button>
          <Button variant="contained" onClick={chooseDrinks}>
            Drinks
          </Button>
        </Stack>
      </Box>
      <Routes>
        <Route path="/menu/mainCourse" element={<MainCourse />} />
        <Route path="/menu/sideDishes" element={<SideDishes />} />
        <Route path="/menu/drinks" element={<Drinks />} />
        <Route path="/" element={<Navigate to="/menu/mainCourse" />} />
      </Routes>
    </div>
  );
}
