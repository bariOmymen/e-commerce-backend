import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {findIconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
const Rating = ({rating, numReviews}) => {
library.add(faStar, faStarHalf);
const IconLookup = { prefix: 'fas', iconName: 'star' }
const starIconDefinition = findIconDefinition(IconLookup)
const halfStarLookup = { prefix: 'fas', iconName: 'star-half' }
const halfStarIconDefinition = findIconDefinition(halfStarLookup)
    return (
        <div className="rating">
       <FontAwesomeIcon  icon={rating >= 1 ? starIconDefinition : rating >=0.5 ? halfStarIconDefinition : ""} />
       <FontAwesomeIcon icon={rating >= 2 ?  starIconDefinition : rating >=1.5 ?  halfStarIconDefinition : ""} />
       <FontAwesomeIcon icon={rating >= 3 ?  starIconDefinition : rating >=2.5 ?  halfStarIconDefinition : ""} />
       <FontAwesomeIcon icon={rating >= 4 ?  starIconDefinition : rating >=3.5 ?  halfStarIconDefinition : ""} />
       <FontAwesomeIcon icon={rating >= 5 ?  starIconDefinition : rating >=4.5 ?  halfStarIconDefinition : ""} />
        
      
        <span className='num-reviews'>
            {numReviews}
        </span>
        </div>
    )
}

export default Rating
