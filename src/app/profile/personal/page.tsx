'use client';
import React, { useEffect, useState } from 'react'
import Profile from '../../profile/page';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';

export default function page() {

    const {token} = useAuth();
    const [profile, setProfile] = useState({})
    const [user, setUser] = useState({})
 
    useEffect(() => {
        if(token){
            axios.get('http://localhost:3001/profile/personal_details', {
                headers : {
                  'Authorization' : `Bearer ${token}`
                }
              })
              .then(response => {
                console.log(response);
                setProfile(response.data.profile[0]);
                setUser(response.data.user[0]);
              }) 

              .catch(error => {
                console.log(error);
              })
        }
    }, [token]);


  return (
    <Profile>
      <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Personal Profile</h1>
        
        <div className="text-center mb-4">
            <h2 className="text-2xl text-gray-700">Contact Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Name</h3>
                <p className="text-gray-600">{user.firstname} {user.lastname}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">{profile.phone_number}</p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">{profile.address}</p>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">{user.email}</p>
            </div>
            
           
        </div>

        

        
    </div>


    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-4">
            <h2 className="text-2xl text-gray-700">Profile</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Job Title</h3>
                <p className="text-gray-600">{profile.job_title}</p>
            </div>

        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
                <p className="text-gray-600">{profile.profile}</p>
            </div>
            
            
            
            
           
        </div>

        

        
    </div>

    

    </Profile>
  )
}
