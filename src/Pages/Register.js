import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [name, setAgentName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation
    if (!companyName || !companyEmail || !username || !password || !name || !phone || !companyAddress) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          companyEmail,
          username,
          password,
          companyAddress,
          name,
          phone
        }),
      });
  
      if (response.ok) {
        setSuccess("Registration successful. Please login."); // Set success message
        setCompanyName(""); // Reset form fields
        setCompanyEmail("");
        setUsername("");
        setPassword("");
        setCompanyAddress("");
      } else if (response.status === 400) {
        const errorData = await response.text();
        setError(errorData); // Set the error message received from the server
      } else {
        setError("An error occurred. Please try again.");
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
        <div className="col-sm-offset-2 col-sm-8">
          <div className="login-inner">
            <h2>Agent Registration</h2>
            <p>Create your company profile. post your properties</p>
            <form onSubmit={handleSubmit}>
                <div className="row">
              <div className="form-group col-sm-6">
                <label>Company name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Company Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter company mail"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Agent Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agent Name"
                  value={name}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-12">
                <label>Company address</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Enter company address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group col-sm-12 text-center">
              {error && <p className="error">{error}</p>}
                <button type="submit" className="btn btn-primary sub-btn">
                  Register
                </button>
                <Button variant="outlined" className="re-btn" onClick={() => navigate("/login")}>
                Already have an account? Login
              </Button>
            
              </div>
             
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
