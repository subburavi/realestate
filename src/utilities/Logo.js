import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../assets/images/logo.png';

function Logo() {
    return (
        <>
            <div className='logoContainer'>
                <img src={logo} className="logoImg" />

            </div>
        </>
    )
}
export default Logo;