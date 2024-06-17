import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import LoginPage from './LoginPage';
import {jwtDecode} from 'jwt-decode'


const DashboardPage = () => {

  

 return (
    <>
      <Header  />
      <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
        
        <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img className='rounded-3xl' src={"profile?.photo"} alt={"profile?.name.charAt(0).toUpperCase()"} />
            </div>
            <Link  className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                {"Ray Anderson"}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                <p className="text-base">
               {"Administrator"}
                </p>
            </Link>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="leading-relaxed text-lg mb-4">
                    <p>Email: <span className='text-sm'>{"ray@example.com"} </span></p>
                    <p>Phone: <span className='text-sm'>{"555-555-5555"} </span></p>
                    <p>Address: <span className='text-sm'>{"123 Abc Lane"} </span></p>
                
                
                </div>

               <div className='flex flex-col gap-4'>
               <Link  className="text-indigo-500 inline-flex items-center">
               {/* to={`/profile/edit?name=${profile?.name}`} */}
                Edit Profile
               
              
            </Link>

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
            


           
            </div>
        </div>

    </div>
    </div>
      </section>

     
    </>
  )


 }

export default DashboardPage
