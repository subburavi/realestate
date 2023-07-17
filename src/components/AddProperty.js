import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddProperty=()=>{
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const userSession = JSON.parse(localStorage.getItem('userData'));

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Perform form validation
      const title = document.getElementById("title").value;
      const category = document.getElementById("category").value;
      const bedrooms = document.getElementById("bedrooms").value;
      const bathrooms = document.getElementById("bathrooms").value;
      const hall = document.getElementById("hall").value;
      const kitchen = document.getElementById("kitchen").value;
      const squareFeet = document.getElementById("squareFeet").value;
      const location = document.getElementById("location").value;
      const amenities = document.getElementById("amenities").value;
      const city = document.getElementById("city").value;
      const price = document.getElementById("price").value;
      const state = document.getElementById("state").value;
      const description = document.getElementById("description").value;
      const image = document.getElementById("image").files[0];
  
      if (
        !title ||
        !category ||
        !bedrooms ||
        !bathrooms ||
        !hall ||
        !kitchen ||
        !squareFeet ||
        !location ||
        !description ||
        !city ||
        !price ||
        !state ||
        !image
      ) {
        setError("All fields are required");
        return;
      }
  
      // Create form data object
      const formData = new FormData();

      
      formData.append("user_id", userSession.id)
      formData.append("title", title);
      formData.append("category", category);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("price", price);
      formData.append("hall", hall);
      formData.append("kitchen", kitchen);
      formData.append("squareFeet", squareFeet);
      formData.append("location", location);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("amenities", amenities);
      formData.append("description", description);
      formData.append("image", image);
  
      try {
        const response = await fetch("http://localhost:3001/property/add", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
            setSuccess("Property published successfully.");
            e.target.reset(); 
        } else {
          setError("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    };
    return <div className="box">
        <h4 className="box-heading">Add Property
         
         <Button className="add-prop" onClick={()=>navigate('/profile/properties')}>Back</Button>
        </h4>
        <div className="box-content">
        <div class="row">
    
  <form className="addproperty-form" onSubmit={handleSubmit}>
  <div className="msg">
    {success && <p className="success">{success}</p>}
    </div>
     <div class="form-group col-sm-6">
      <label for="title">Title:</label>
      <input type="text" class="form-control" id="title" placeholder="Enter property title" required />
    </div>
    <div class="form-group col-sm-6">
      <label for="category">Category:</label>
      <select class="form-control" id="category" required>
        <option value="">Select category</option>
        <option value="rent">For Rent</option>
        <option value="sell">For Sale</option>
      </select>
    </div>
    <div class="form-group col-sm-3">
      <label for="bedrooms">Bedrooms:</label>
      <input type="number" class="form-control" id="bedrooms" placeholder="Enter number of bedrooms" required />
    </div>
    <div class="form-group col-sm-3">
      <label for="bathrooms">Bathrooms:</label>
      <input type="number" class="form-control" id="bathrooms" placeholder="Enter number of bathrooms" required />
    </div>
    <div class="form-group col-sm-3">
      <label for="hall">Hall:</label>
      <input type="number" class="form-control" id="hall" placeholder="Enter number of halls" required />
    </div>
    <div class="form-group col-sm-3">
      <label for="kitchen">Kitchen:</label>
      <input type="number" class="form-control" id="kitchen" placeholder="Enter number of kitchens" required />
    </div>
    <div class="form-group col-sm-6">
      <label for="squareFeet">Square Feet:</label>
      <input type="number" class="form-control" id="squareFeet" placeholder="Enter property size in square feet" required />
    </div>
    <div class="form-group col-sm-6">
      <label for="price">Price:</label>
      <input type="number" class="form-control" id="price" placeholder="Enter property price" required />
    </div>
    <div class="form-group col-sm-4">
      <label for="location">Location:</label>
      <input type="text" class="form-control" id="location" placeholder="Enter property location" required />
    </div>
    <div class="form-group col-sm-4">
      <label for="city">City</label>
      <input type="text" class="form-control" id="city" placeholder="Enter city name" required />
    </div>
    <div class="form-group col-sm-4">
      <label for="state">State:</label>
      <input type="text" class="form-control" id="state" placeholder="Enter state name" required />
    </div>
    <div class="form-group col-sm-6">
      <label for="amenities">Amenities:</label>
      <textarea class="form-control" id="amenities" rows="5" placeholder="Enter property amenities"></textarea>
    </div>
    <div class="form-group col-sm-6">
      <label for="description">Description:</label>
      <textarea class="form-control" id="description" rows="5" placeholder="Enter property description" required></textarea>
    </div>
    <div class="form-group col-sm-6">
      <label for="image">Image:</label>
      <input type="file" class="form-control-file" id="image" required />
    </div>
    {error && <p className="error">{error}</p>}
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
  </form>
</div>
        </div>
    </div>
}

export default AddProperty;