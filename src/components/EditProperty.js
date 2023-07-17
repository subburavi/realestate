import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [property, setProperty] = useState(null);
  const userSession = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3001/property/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
         
        } else {
          setError("Failed to fetch property details.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching property details.");
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const bedrooms = e.target.bedrooms.value;
    const bathrooms = e.target.bathrooms.value;
    const hall = e.target.hall.value;
    const kitchen = e.target.kitchen.value;
    const squareFeet = e.target.squareFeet.value;
    const location = e.target.location.value;
    const amenities = e.target.amenities.value;
    const city = e.target.city.value;
    const state = e.target.state.value;
    const description = e.target.description.value;
    const image = e.target.image.files[0];

    const formData = new FormData();
    formData.append("user_id", userSession.id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("hall", hall);
    formData.append("kitchen", kitchen);
    formData.append("squareFeet", squareFeet);
    formData.append("location", location);
    formData.append("amenities", amenities);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch(`http://localhost:3001/updateproperty/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setSuccess("Property updated successfully.");
      } else {
        setError("Failed to update the property.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the property.");
    }
  };
   if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="box">
      <h4 className="box-heading">Edit Property
      <Button className="add-prop" onClick={()=>navigate('/profile/properties')}>Back</Button>

      </h4>
      <div className="box-content">
        <div className="row">
          <form className="addproperty-form" onSubmit={handleSubmit}>
            <div className="msg">  {success && <p className="success">{success}</p>}</div>
            <div className="form-group col-sm-6">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" id="title" placeholder="Enter property title" defaultValue={property.title} required />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="category">Category:</label>
              <select className="form-control" id="category" defaultValue={property.category} required>
                <option value="">Select category</option>
                <option value="rent">For Rent</option>
                <option value="sell">For Sale</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <input type="number" className="form-control" id="bedrooms" placeholder="Enter number of bedrooms" defaultValue={property.bedrooms} required />
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="bathrooms">Bathrooms:</label>
              <input type="number" className="form-control" id="bathrooms" placeholder="Enter number of bathrooms" defaultValue={property.bathrooms} required />
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="hall">Hall:</label>
              <input type="number" className="form-control" id="hall" placeholder="Enter number of halls" defaultValue={property.hall} required />
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="kitchen">Kitchen:</label>
              <input type="number" className="form-control" id="kitchen" placeholder="Enter number of kitchens" defaultValue={property.kitchen} required />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="squareFeet">Square Feet:</label>
              <input type="number" className="form-control" id="squareFeet" placeholder="Enter property size in square feet" defaultValue={property.squareFeet} required />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="price">Price:</label>
              <input type="number" className="form-control" id="price" placeholder="Enter property price" defaultValue={property.price} required />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="location">Location:</label>
              <input type="text" className="form-control" id="location" placeholder="Enter property location" defaultValue={property.location} required />
            </div>
          
            <div className="form-group col-sm-4">
              <label htmlFor="city">City:</label>
              <input type="text" className="form-control" id="city" placeholder="Enter city name" defaultValue={property.city} required />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="state">State:</label>
              <input type="text" className="form-control" id="state" placeholder="Enter state name" defaultValue={property.state} required />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="amenities">Amenities:</label>
              <textarea className="form-control" id="amenities" rows="5" placeholder="Enter property amenities" defaultValue={property.amenities}></textarea>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="description">Description:</label>
              <textarea className="form-control" id="description" rows="5" placeholder="Enter property description" defaultValue={property.description} required></textarea>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="image">Image:</label>
              <input type="file" className="form-control-file" id="image"  />
            </div>
          <div className="msg"> {error && <p className="error">{error}</p>}</div> 
          
            <button type="submit" className="btn btn-primary">Update Property</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
