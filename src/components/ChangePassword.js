const ChangePassword=()=>{
    return <div className="box">
        <h4 className="box-heading">Change Password</h4>
        <div className="box-content">
             <div className="passwordbox">
                <div className="form-group">
                      <label>Current Password</label>
                      <input type="text" placeholder="Enter Current password" className="form-control"/>
                </div>
                <div className="form-group">
                      <label>New Password</label>
                      <input type="password" placeholder="Enter New password" className="form-control"/>
                </div>
                <div className="form-group">
                      <label>Confirm Password</label>
                      <input type="password" placeholder="Enter confirm password" className="form-control"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Change Password</button>                </div>
             </div>
        </div>
    </div>
}

export default ChangePassword;