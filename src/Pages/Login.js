import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userUpdate } from "../Store/Appdataslice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/validateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(userUpdate({islogged:true,user:userData}));

        navigate("/profile/account"); 
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userData'));

    if (userSession) {
       navigate('/profile/account');
    }
  }, []);
  return (
    <div className="logindiv bgbanner">
      <div className="container">
        <div className="col-sm-offset-4 col-sm-4">
          <div className="login-inner">
            <h2>Agent Login</h2>
            <p>Use your company username/password</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary sub-btn">
                  Login
                </button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Create profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
