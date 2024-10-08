'use client';
import React, { useEffect, useState } from 'react'
import Profile from '../../profile/page';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';

export default function page() {

  const {token} = useAuth();
  const [qualifications, setQualifications] = useState([])

  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100'];

  useEffect(() => {
    if(token)
    {
      axios.get('http://localhost:3001/profile/qualifications', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response)
        setQualifications(response.data.qualification);
      })

     .catch(error => {
       console.log(error); 
     })

    }else{
      console.log('No token found');
    }
  }, [token])

  


  return (
    <Profile>
       <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Qualifications</h1>
        
        <div className="space-y-6">
            {/* <!-- Qualification 1 --> */}
            {
              qualifications.map((qualification, index) => {
                //  below code store remainder in color array , which gives data from colors array
                const backgroundColor = colors[index % colors.length];
                 return(
                  <div key={index} className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{qualification.field_of_study}</h3>
                    <p className="text-gray-600">{qualification.university}</p>
                    <p className="text-gray-600">Completed: {qualification.end_year}</p>
                </div>
                 )
              })
            }
            
            
           
        </div>
    </div>

    </Profile>
  )
}
