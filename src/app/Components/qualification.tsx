'use client'
import { InformationContext } from '@/context/InformationContext';
import React, { useState, useContext, useEffect, TextareaHTMLAttributes } from 'react';
import {useAuth} from '../Contexts/AuthContext';
import axios from 'axios';

export interface QualificationInterface{
  university : '',
  field_of_study: '',
  completed_from: '',
  level: '',
  start_year: '',
  end_year: '',
  detail: ''
}

interface AuthType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token?: string; // Optional if needed
}



export default function Qualification() {


  


  const initialFormState: QualificationInterface = {
    university: '',
    field_of_study: '',
    completed_from: '',
    level: '',
    start_year: '',
    end_year: '',
    detail: ''
  };

  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const[inputField, setInputField] = useState<QualificationInterface>(initialFormState);
  const { addQualificationList, setQualifications} = useContext(InformationContext);
  const { auth, loading, error, token}: { auth: AuthType | null; loading: boolean; error: any; token:AuthType | null } = useAuth();


  useEffect(() => {
    const fetchUserQualificationData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/profile/qualifications', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response);

          const qualificationData = response.data.qualification; // Adjust this according to the response structure
          setQualifications(qualificationData);
         
        } catch (error) {
          console.error('Error fetching qualification data:', error);
         
        }
      }
    };

    fetchUserQualificationData();
  }, [token, setQualifications]);


  function onChangeInputField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
      const {name, value} = event.target;
      setInputField((prevState) => ({
        ...prevState, [name]: value
      }))

      // updateData({[name]: value})
    }

    function resetForm()
    {
      setInputField(initialFormState);
    }



    function addQualification(event: React.ChangeEvent<HTMLFormElement>)
    {
      event.preventDefault();
      addQualificationList(inputField);
      resetForm();
    }


  return (
    <div className='p-6'>
      <br />
 <h1 className="text-4xl font-bold mb-2 ">Qualification</h1>
  <form className="max-w-md  p-3" onSubmit = {addQualification}>
  
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">University</label>
      <input type="text" id="university" value={inputField.university} name='university' onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <div className="mb-5">
      <label htmlFor="field_of_study" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Of Study</label>
      <input type="text" id="field_of_study" name='field_of_study' onChange={onChangeInputField} value={inputField.field_of_study} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="completed_from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Completed from</label>
      <input type="text" id="completed_from" name='completed_from' value={inputField.completed_from} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <div className="mb-5">
      <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
      <input type="text" id="level" name='level' value={inputField.level} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="start_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start year</label>
      <input type="date" id="start_year" name='start_year' value={inputField.start_year} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>

  <div className="mb-5">
      <label htmlFor="end_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End year</label>
      <input type="date" id="end_year" name='end_year' value={inputField.end_year} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
  <label htmlFor="detail" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Detail</label>
  <textarea  id="detail" rows= {6}  name='detail' onChange={onChangeInputField} value = {inputField.detail}   className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anything you want to add ..."></textarea>
  </div>
  </div>

  <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Qualification</button>
  
</form>
</div>
  )
}

