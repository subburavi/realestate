import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Home from './Pages/Home';
import './assets/bootstrap/css/bootstrap.css';
import './assets/style.css';
import './assets/owl-carousel/owl.carousel.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyAccount from './Pages/Myaccount';
import { userUpdate } from './Store/Appdataslice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userData'));

    if (userSession) {
      dispatch(userUpdate({ isLogged: true, user: userSession }));
    }
  }, [dispatch, location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/*" element={<MyAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
