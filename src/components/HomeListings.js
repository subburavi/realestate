import { useEffect, useState } from 'react';
import PropertyBox from './PropertyBox';

const HomeListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/home-properties') // Adjust the URL to match your server's API endpoint
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error(error));
  }, []);
console.log(properties);
  return (
    <>
      <div className="properties-listing spacer">
        <a href="buysalerent.php" className="pull-right viewall">View All Listing</a>
        <h2>Featured Properties</h2>
        <div id="owl-example" className="owl-carousel">
          {properties.map(property => (
            <PropertyBox key={property._id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeListings;
