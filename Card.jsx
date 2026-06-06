import React from 'react'
import {Bookmark, TextAlignCenter} from 'lucide-react'; 

const Card = (props) => {
      return (
        
    <div className="parent">
      <div className="card">
        <div className="top">
          <img src={props.logo} alt=""/>
          <button>Save <Bookmark/></button>
        </div>
        <div className="center">
          <h3>{props.comapny}<span>{props.posted}</span></h3>
          <h2>{props.post}</h2>
            <h4 className='role1'>{props.tag1}</h4>
            <h4 className='role2'>{props.tag2}</h4>
         
        </div>
        <div className="bottom">
          <div>
            <h3><p>________________________</p>{props.pay}</h3>
            <p className='p1'>{props.location}</p>
          </div>
          <button>Apply now !</button>

        </div>
      </div>
    </div>
  )
}

export default Card
