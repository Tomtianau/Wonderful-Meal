import Homepage from './views/Homepage';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FoodItem from './views/FoodItem';
import FoodCart from './views/FoodCart';
import SignIn from './views/SignIn';
import OrderType from './views/OrderType';
import PickUp from './views/PickUp';
import Delivery from './views/Delivery';
import SignUp from './views/SignUp';
import Payment from './views/Payment';
import OrderInfomation from './views/OrderInfomation';
import Header from './components/Header';
import Restaurant from './views/Restaurant';
import PayPalOrderDetails from './views/PayPalOrderDetails';
import GooglePayOrderDetails from './views/GooglePayOrderDetails';
import AccountSettings from './views/AccountSettings';
import EditInfo from './views/EditInfo';

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <Header />
        </header>
        <main className="main">
          <Container maxWidth="lg">
            <Routes>
              <Route path="/item/:slug" element={<FoodItem />} />
              <Route path="/restaurants/:slug" element={<Restaurant />} />
              <Route path="/foodcart" element={<FoodCart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/accountsettings" element={<AccountSettings />} />
              <Route path="/editinfo" element={<EditInfo />} />
              <Route path="/ordertype" element={<OrderType />} />
              <Route path="/pickup" element={<PickUp />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orderinfomation" element={<OrderInfomation />} />
              <Route
                path="/PayPal/orderdetail/:id"
                element={<PayPalOrderDetails />}
              />
              <Route
                path="/GooglePay/orderdetail/:id"
                element={<GooglePayOrderDetails />}
              />
              <Route path="*" element={<Homepage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="footer">
            Copyright@Wonderful Meal. 2022 All Rights Reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
