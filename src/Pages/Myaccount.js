import AccountMenu from '../components/Accountmenu';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';
import Properties from '../components/Properties';
import { useEffect } from 'react';
import Logout from './Logout';
import AddProperty from '../components/AddProperty';
import EditProperty from '../components/EditProperty';

const MyAccount = () => {
  const navigate=useNavigate();
   useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userData'));

    if (!userSession) {
       navigate('/login');
    }
  }, []);
  return (
    <div className="myaccount container">
      <div className="row">
        <div className="col-sm-3">
          <AccountMenu active="account" />
        </div>
        <div className="col-sm-9">
            <div className='rightbox'>
          <Routes path='/' element={<Profile/>}>
            <Route path="account" element={<Profile/>} />
            <Route path="properties" element={<Properties/>} />
            <Route path="addproperty" element={<AddProperty/>} />
            <Route path="editproperty/:id" element={<EditProperty/>} />
            <Route path="changepassword" element={<ChangePassword/>} />
            <Route path="logout" element={<Logout/>} />
          </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
