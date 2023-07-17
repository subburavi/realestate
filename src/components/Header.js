import { Button } from '@material-ui/core';
import logo from '../assets/images/logo.png';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Header =()=>{
     const navigate=useNavigate();
     const [login,setLogin]=useState(false);
     useEffect(() => {
      const userSession = JSON.parse(localStorage.getItem('userData'));
  
      if (userSession) {
       setLogin(true);
      }else{
        setLogin(false);
      }
    }, []);


      return <>
      <div class="navbar-wrapper">

<div class="navbar-inverse" role="navigation">
  <div class="container">
    <div class="navbar-header">


      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

    </div>


    <div class="navbar-collapse  collapse">
      <ul class="nav navbar-nav navbar-right">
       <li class="active"><a href="index.php">Home</a></li>
        <li><a href="about.php">About</a></li>
        <li><a href="agents.php">Agents</a></li>         
        <li><a href="blog.php">Blog</a></li>
        <li><a href="contact.php">Contact</a></li>
      </ul>
    </div>

  </div>
</div>

</div>




<div className='header-main'>
<div class="container">

<div class="header">
<a  onClick={()=>navigate('/')}>
  {/* <img src={logo} alt="Realestate"/> */}
  <h2>Smart Housing</h2>
  </a>

    { login ?   <ul class="pull-right">
        
        <li><button onClick={()=>navigate('/profile/account')} className='menu-btn'>Dashboard</button></li>
        <li><button onClick={()=>navigate('/profile/logout')} className='menu-btn'>Logout</button></li>

      </ul>  :  <ul class="pull-right">
        
        <li><button onClick={()=>navigate('/register')} className='menu-btn'>Create account</button></li>
        <li><button onClick={()=>navigate('/login')} className='menu-btn'>Login</button></li>

      </ul>}
</div>
</div>
</div>
      </>
}

export default Header;