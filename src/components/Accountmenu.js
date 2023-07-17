import { useLocation, useNavigate } from "react-router-dom"
import userpic from '../assets/images/user.jpg';
const AccountMenu=(props)=>{

    const navigate=useNavigate();
    const path=useLocation();

    return <div className="profilebox">
            <div className="profilepic">
                    <img src={userpic}/>
                    <h3>Sai constraction</h3>
            </div>
            <div className="profilemenu">
            <div class="btn-group-vertical">
  <button type="button" class={path.pathname=='/profile/account' ? 'btn active' :'btn'} onClick={()=>navigate('/profile/account')}>Account</button>
  <button type="button" class={path.pathname=='/profile/properties' ? 'btn active' :'btn'}   onClick={()=>navigate('/profile/properties')}>My Properties</button>
  <button type="button" class={path.pathname=='/profile/changepassword' ? 'btn active' :'btn'}   onClick={()=>navigate('/profile/changepassword')} >Change Password</button>
  <button type="button" class={path.pathname=='/profile/logout' ? 'btn active' :'btn'}   onClick={()=>navigate('/profile/logout')}>Logout</button>

</div> 
            </div>
         
    </div>

}
export default AccountMenu;