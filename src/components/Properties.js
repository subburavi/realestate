import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Properties = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem("userData"));
  const user_id = userSession.id;

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error("Error fetching properties");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit=(id)=>{
      navigate('/profile/editproperty/'+id);
  }
  const handleDelete=(id)=>{
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (confirmed) {
        fetch(`http://localhost:3001/deleteproperty/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.ok) {
                alert('Property deleted successfully');
                window.location.reload();
              } else {
                alert('Error deleting the property');
              }
            })
            .catch((error) => {
              console.error('Error deleting the property', error);
            });
    }
 }
  
const handleLeads=(id)=>{
    
}
  return (
    <div className="box">
      <h4 className="box-heading">
        My Properties
        <Button className="add-prop" onClick={() => navigate("/profile/addproperty")}>
          Add Property
        </Button>
      </h4>
      <div className="box-content">
        {properties.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Property Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>
                  <td>{property.title}</td>
                  <td>{property.category}</td>
                  <td>{property.price}</td>
                  <td>{property.location}</td>
                  <td>
                    <Button variant="outlined" onClick={() => handleEdit(property._id)}>
                      Edit
                    </Button>
                  
                    <Button variant="outlined" onClick={() => handleDelete(property._id)}>
                      Delete
                    </Button>
                    <Button variant="outlined" onClick={() => handleLeads(property.id)}>
                      Leads
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No records available.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
