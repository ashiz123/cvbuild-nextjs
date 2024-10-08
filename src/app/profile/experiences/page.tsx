'use client';
import React, { useEffect, useState } from 'react'
import Profile from '../../profile/page';
import { useAuth } from '@/app/Contexts/AuthContext';
import axios from 'axios';

export default function page() {
  
  const {token} = useAuth();
  const [experiences, setExperiences] = useState([]);


  useEffect(() => {
    if(token){
      axios.get('http://localhost:3001/profile/experiences', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response);
        setExperiences(response.data.experiences);

      })

      .catch(error => {
        console.log(error);
      })
    }
  }, [token])


  return (
    <Profile>
      <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Experiences</h1>
        
        <div className="space-y-6">
            
            {
              experiences.map((experience, index) => {
                return(
                  <div className="p-6 bg-blue-100 rounded-lg shadow-md relative">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{experience.title}</h3>
                  <h4 className="text-xl text-gray-700">{experience.company_name}</h4>
                  <p className="text-gray-600">{experience.start_year} - {experience.end_year}</p>
                  <p className="mt-4 text-gray-700">
                     {experience.detail}
                  </p>
                  <button className="absolute top-4 right-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Edit</button>
                </div>
                )
              })
            }
           
            
            
        </div>

        <div className="text-center mt-8">
            <button className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-3">Add More Experience</button>
        </div>
    </div>
    </Profile>
  )
}
