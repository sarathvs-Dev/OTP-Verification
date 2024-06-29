import React from 'react'
import NavBar from '../componets/NavBar'

const homePage = () => {
  return (
    <
        
    ><NavBar/>
    
    <div className="mt-[-40px]">
    <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl  sm:py-0">
      <div className="container text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to Home page</h1>
       
        <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                     
                    >Log out
                     
                    </button>
      </div>
    </div>
  </div>
  
    
    
    </>
  )
}

export default homePage