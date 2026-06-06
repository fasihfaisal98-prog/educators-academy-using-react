import React from 'react'
import Navbar from './Navbar/Navbar'
import Webcontent from './webcontent'

import Card from "./Card";
import Studentfeedback from './Studentfeedback';
import Contactus from './Contactus';
import Footer from './Footer';




const App = () => {

   
   const jobOpenings = [
    
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Class 9th Admissions",
    tag1: "Cs",
    tag2: "Bio",
    pay: "Rs : 6000/month",
    location: "Karachi, Pakistan",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Class 10th Admissions",
    tag1: "Cs",
    tag2: "Bio",
    pay: "Rs : 6500/month",
    location: "Karachi, Pakistan",
  },
 {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Class 11th Admissions",
    tag1: "CS/pre-enginnering",
    tag2: "Bio/commerce",
    pay: "Rs : 7000/month",
    location: "Karachi, Pakistan",
  },
   {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Class 12th Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 7500/month",
    location: "Karachi, Pakistan",
  },
   {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Entry Test Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 65000/6months",
    location: "Karachi, Pakistan",
  },
   {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Computer courses Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 8000/month",
    location: "Karachi, Pakistan",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "English language course Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 12000/month",
    location: "Karachi, Pakistan",
  },
   {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Only maths classes Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 5000/month",
    location: "Karachi, Pakistan",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekbEPzhwIplF2hB9GX1auOUrFHM-pa0VgNQ&s",
    
    datePosted: "1 year complete teaching program",
    post: "Selctives subjects Admissions",
    tag1: "CS/pre-engineering",
    tag2: "Bio/commerce",
    pay: "Rs : 3000/month",
    location: "Karachi, Pakistan",
  },
];
return (
  <div>
   <Navbar/>

   <Webcontent/>
 

    <div className='parent '>
   
      {jobOpenings.map(function(elem , idx){
       
      return <div key={idx}>
        
       <Card comapny = {elem.companyName} post = {elem.post} 
      posted = {elem.datePosted} tag1 = {elem.tag1} tag2 = {elem.tag2} pay={elem.pay} 
      location = {elem.location} logo = {elem.brandLogo} />

  </div>
 

  })}
   <div>
     <Studentfeedback/>
  </div>
  <div>
    <Contactus/>
  </div>
  <div>
    <Footer/>
  </div>
        
    </div>
      </div>
  )

}
export default App
