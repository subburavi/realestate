const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

let db;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://realestate:realestate12345@realestate.8gbpzqw.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db=await client.db("realestate");
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
   // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


  
// Multer configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + uuidv4();
      const fileExtension = path.extname(file.originalname);
      const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });

app.get('/users', async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
      const user = req.body;
        const existingUser = await db.collection('users').findOne({
        $or: [
          { username: user.username },
          { email: user.email }
        ]
      });
  
      if (existingUser) {
        return res.status(400).send('Username or email already exists');
      }
        const result = await db.collection('users').insertOne(user);
      res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred');
    }
  });
  

app.post("/validateuser", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await db.collection("users").findOne({ username });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Authentication successful
      res.json({
        id: user._id,
        username: user.username,
        // Include any other relevant user data
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

  app.post("/property/add", upload.single("image"), async (req, res) => {
    try {
      const { title, category, bedrooms, bathrooms, hall, kitchen, squareFeet, location, amenities, description,user_id,city,state,price } = req.body;
      const image = req.file;
  
      // Validate required fields
      if (!title || !category || !bedrooms || !bathrooms || !hall || !kitchen || !squareFeet || !location || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Save data to MongoDB
      const property = {
        user_id,
        title,
        category,
        bedrooms,
        bathrooms,
        hall,
        kitchen,
        squareFeet,
        price,
        location,
        city,
        state,
        amenities,
        description,
        imageUrl: req.file.filename, // Store the filename in MongoDB
      };
  
      // Save property data to MongoDB
      
      const result = await db.collection('properties').insertOne(property);

      res.status(200).json({ message: "Property added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again" });
    }
  });

  app.get('/properties/:user_id', async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const properties = await db.collection('properties').find({ user_id }).toArray();
      res.json(properties);
    } catch (error) {
      console.error('Error retrieving properties:', error);
      res.status(500).json({ error: 'Error retrieving properties' });
    }
  });
  app.get('/property/:id', async (req, res) => {
    try {
      const propertyId = req.params.id;
      const property = await db.collection('properties').findOne({ _id: new ObjectId(propertyId) });
      
      if (property) {
        res.json(property);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  app.put('/updateproperty/:propertyId', upload.single('image'), async (req, res) => {
    const propertyId = req.params.propertyId;
    const updatedData = req.body;
  
    if (req.file) {
    
      const imageUrl = req.file.filename;
      updatedData.imageUrl = imageUrl;
    }
  
    try {
      let updatedProperty;
  
      if (req.file) {
       
        updatedProperty = await db.collection('properties').findOneAndUpdate(
          { _id:  new ObjectId(propertyId) },
          { $set: updatedData },
          { returnOriginal: false }
        );
      } else {
       
        updatedProperty = await db.collection('properties').findOneAndUpdate(
          { _id:  new ObjectId(propertyId) },
          { $set: updatedData },
          { returnOriginal: false }
        );
      }
  
      res.json(updatedProperty.value);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating property' });
    }
  });
  
  app.delete('/deleteproperty/:id', async (req, res) => {
    const propertyId = req.params.id;
  
    try {
      const deletedProperty = await db.collection('properties').deleteOne({ _id: new ObjectId(propertyId) });

      if (!deletedProperty) {
        // Property not found
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting property' });
    }
  });
  
  app.get('/api/home-properties', async (req, res) => {
    try {
      // Fetch the latest 8 properties from the database
      const properties = await  db.collection('properties').find().limit(8).sort({ createdAt: -1 }).toArray();
  
      res.json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving home properties' });
    }
  });
  
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const result = await db.collection('users').updateOne({ _id: id }, { $set: user });
    res.json(result);
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.collection('users').deleteOne({ _id: id });
    res.json(result);
});
