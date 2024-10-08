'use client';
import React, { useEffect, useState } from 'react'
import Profile from '../../profile/page';
import { useAuth } from '@/app/Contexts/AuthContext';
import axios from 'axios';

export default function page() {

  const [skills, setSkills] = useState([]);
  const{token} = useAuth();

  useEffect(() => {
    if(token){
      axios.get('http://localhost:3001/profile/skills', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(response => {
          console.log(response);
          setSkills(response.data.skills);

      })

      .catch(error => {
        console.log(error)
      })
    }

  }, [token])

  


  return (
    <Profile>
       <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Skills</h1>
        
        <div className="space-y-6">
     
            {
              skills.map((skill, index) => {
                return(
                  <div className="p-6 bg-blue-100 rounded-lg shadow-md relative">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{skill.skill_name}</h3>
                  <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                          <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                  Expert
                              </span>
                          </div>
                          <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                  90%
                              </span>
                          </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                      </div>
                  </div>
                  <button className="absolute top-4 right-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Edit</button>
              </div>
                )
              })
            }
           

           

          
        </div>

        <div className="text-center mt-8">
            <button className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-3">Add Skill</button>
        </div>
    </div>
    </Profile>
  )
}
