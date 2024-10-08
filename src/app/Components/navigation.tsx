'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {useAuth} from '../Contexts/AuthContext';


export default function Navigation() {

  const {auth, logout} = useAuth();


 

  function logoutUser()
  {
     logout();
  }


  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      <Link href="/" className="font-semibold text-xl tracking-tight">
         Home 
      </Link>
  </div>
 
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <Link href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
         Profile 
      </Link>
      <Link href="/jobs" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Jobs
      </Link>
      <Link href="/blogs" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Blog
      </Link>
    </div>
    <div>
      {
        auth ?
        <Link href= "" onClick={logoutUser} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</Link>:
        <Link href="/Login-user" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</Link>
    
      }
    </div>
  </div>
</nav>
  )
}
