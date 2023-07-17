import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


function CloseBtn(props) {

    return (
        <>
            <div className='closeContainer'>
                <IconButton aria-label="delete" onClick={() => props.onClick()}>
                    <CloseIcon />
                </IconButton>

            </div>
        </>
    )
}
export default CloseBtn;