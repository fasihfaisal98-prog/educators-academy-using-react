import React from 'react'

const Webcontent = () => {
  return (
    <div >  
    <div >
    <div >
      <img className = "w-screen h-full object-cover " src="https://img.magnific.com/free-photo/university-colleagues-posing-university_23-2148844672.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
    </div>
     
     <div className = "justify-center flex flex-wrap gap-10 ">

     <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>3000+ Satisfied Students</h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl">
          BOOK YOUR SEAT NOW !
      </p>
   </div>
        <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>EXPERIENCED TEACHERS TEACH HERE</h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl">
          BOOK YOUR SEAT NOW !
      </p>
      </div>
         <div className = ' bg-white rounded-2xl shadow-lg p-20 hover:shadow-2xl hover:-translate-y-2 transition duration-300 w-90 '>
        <h3 className = ' font-bold mb-3 text-gray-800 text-sm md:text-base xl:text-2xl'>10 YEARS+ EXPERIENCE </h3>
         <p className="text-gray-600 text-sm md:text-base xl:text-2xl">
          BOOK YOUR SEAT NOW !
      </p>
      </div>
   </div>

   <div className = 'p-20 flex flex-col justify-center items-center px-4 bg-gray-100'>
    <p className = 'mt-4 text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-xl'>------Future-Ready Programs------ </p>
    <p className = 'text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800'>OUR COURSES</p>
   </div>
   

   </div>
     </div>
   
  )

   
}

export default Webcontent
