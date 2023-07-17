import { Tooltip } from '@mui/material';
import firstpic from '../assets/images/properties/1.jpg';

const PropertyBox=(props)=>{
    const viewProperty=(id)=>{
            alert('Page under development...')
    }
    return   <div class="properties">
    <div class="image-holder"><img src={'http://localhost:3001/uploads/'+props.property.imageUrl} class="img-responsive" alt="properties"/>
      <div class="status">{props.property.category}</div>
    </div>
    <h4><a href="property-detail.php">{props.property.title}</a></h4>
    <p class="price">Price: ${props.property.price}</p>
    <div class="listing-detail">
    <Tooltip title="Bed Rooms" className='tooltip_prop' arrow> {props.property.bedrooms}</Tooltip>
    <Tooltip title="Bath Rooms" className='tooltip_prop' arrow>{props.property.bathrooms}</Tooltip>
    <Tooltip title="Hall" className='tooltip_prop' arrow> {props.property.hall}</Tooltip>
    <Tooltip title="Kitchen" className='tooltip_prop' arrow>  {props.property.kitchen}</Tooltip>
     </div>
    <a class="btn btn-primary" href="" onClick={()=>viewProperty(props.property._id)}>View Details</a>
  </div>;
}

export default PropertyBox;