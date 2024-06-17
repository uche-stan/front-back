import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Toast } from '../utils/alert';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
      
    };


  return (
    <>
    <section className="text-gray-600 body-font relative">

  <form onSubmit={handleSubmit} className=" container px-5 py-24 mx-auto flex justify-center">
    <div className="lg:w-1/3 md:w-1/2 bg-indigo-200 rounded-lg p-8 flex  flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 className="text-gray-900  text-center text-lg mb-1 font-medium title-font">
        Login
      </h2>
     
    
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={email}
          onChange= {(e)=> setEmail(e.target.value)}
        />
      </div>

      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

     


    
      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        {false? 'Loading...': "Login"}
      </button>
      <p className="text-md  text-gray-500 mt-4">
        Don't have an account? <Link className='text-blue-600 underline' to="/register" >Sign-up here</Link>
      </p>
    </div>

    
  </form>
 
 <div className='flex justify-center'>
 <Link to="/" className="text-indigo-500 inline-flex items-center">
            Back home
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
 </div>
  
</section>

      
    </>
  )
}

export default LoginPage
