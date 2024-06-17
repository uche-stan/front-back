import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'


const Header = () => {

   
    const navigate = useNavigate()
   
  return (
    <>

<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="ml-3 text-xl">All Purpose</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <NavLink to="/dashboard" className="mr-5 hover:text-gray-900">Dashboard</NavLink>
      <a className="mr-5 hover:text-gray-900">Second Link</a>
      <a className="mr-5 hover:text-gray-900">Third Link</a>
      <a className="mr-5 hover:text-gray-900">Fourth Link</a>
    </nav>
  
  {
    true?   
    <Link to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" >
    Login
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="w-4 h-4 ml-1"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </Link>:
  <div className='flex items-center'>
     <Link to="/dashboard" className="w-8 h-8 mx-2 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 cursor-pointer">
        <img className='rounded-3xl' src="" alt='' />
    </Link>

<button onClick={()=>{
    // logout();
    // navigate('/')
}} 
    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" >
    Logout
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="w-4 h-4 ml-1"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </button>
  </div>
  }

  
   
    
  </div>
</header>

      
    </>
  )
}

export default Header
