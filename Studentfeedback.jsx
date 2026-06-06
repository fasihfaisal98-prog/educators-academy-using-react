import React from 'react'
import { Star , X } from "lucide-react";


const Studentfeedback = () => {
  return (
    <div>
    <div className = 'p-20 flex flex-col justify-center items-center px-4 bg-gray-100'>
    <p className = 'mt-4 text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-xl'>------Testimonials------ </p>
    <p className = 'text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800'>STORIES OF <br/>
SUCCESS.</p>
   </div>
     
     <div className = "justify-center flex flex-wrap gap-10 ">


     <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>Mariyam khan</h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl flex flex-wrap">
          <p>Hghly recomended all teachers are too good.</p>
        <Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' />
      </p>
   </div>
        <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>Talha shaikh</h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl flex flex-wrap">
          <p>I take Admission in 12th class course and my experience is great.</p>
        <Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' />
      </p>
      </div>
         <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>M.Ahmed </h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl flex flex-wrap">
          <p>I had a great experience with educators academy.</p>
         <Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' /><Star className= 'bg-amber-500 rounded-2xl' />
      </p>
     
    </div>
    </div>
   
    </div>
    
  )
}

export default Studentfeedback
