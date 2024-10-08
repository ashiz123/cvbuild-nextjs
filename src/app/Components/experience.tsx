'use client';
import React, { useContext, useEffect, useState } from 'react';
import { InformationContext } from '@/context/InformationContext';
import {useAuth} from '../Contexts/AuthContext';
import axios from 'axios';

export interface ExperienceInterface
{
  company_name : string;
  skill_earned: string[];
  title: string;
  start_year: string;
  end_year: string;
  detail: string | null;
}

interface AuthType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token?: string; // Optional if needed
}






const Experience: React.FC = () => { 

  const initialFormState = {
    company_name : '',
    skill_earned: [],
    title: '',
    start_year: '',
    end_year: '' ,
    detail: ''
  }  

const {addExperienceList, setExperiences} = useContext(InformationContext);
const [inputField , setInputField] = useState<ExperienceInterface>(initialFormState)
const { auth, loading, error, token}: { auth: AuthType | null; loading: boolean; error: any; token:AuthType | null } = useAuth();


useEffect(() => {

  const fetchUserExperiencesData = async() => {
    if(token){
      try{
        const response = await axios.get('http://localhost:3001/profile/experiences', {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
        const experiencesData = response.data.experiences;
        setExperiences(experiencesData);
      }
      catch (error) {
        console.error('Error fetching qualification data:', error);
       
      }


  }
}

fetchUserExperiencesData();


}, [token, setExperiences])




function onChangeInputField(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
{
  const {name, value} = event.target;
  const data = (name === 'skill_earned')
      ? value.split(',').map(item => item.trim())
      : value;

  setInputField((prevItem) => ({...prevItem, [name]: data}))
  // [name]: name === 'skill_earned' ? value.split(',').map(item => item.trim()) : value
}


function resetForm()
{
  setInputField(initialFormState);
}


function addExperience(event: React.ChangeEvent<HTMLFormElement>)
{
  event.preventDefault();
  addExperienceList(inputField);
  resetForm();
}




  return (
    <div className='p-6'>
    <br />
<h1 className="text-4xl font-bold mb-2 ">Experience</h1>
<form className="max-w-md  p-3" onSubmit = {addExperience}>
  
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-4">
      <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
      <input type="text" id="company_name"  name='company_name' onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <div className="mb-5">
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" id="title" name='title'   onChange={onChangeInputField} value={inputField.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  
  </div>
  
  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
      <label htmlFor="skill_earned" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Earned</label>
      <input type="text" id="skill_earned" name='skill_earned'   onChange={onChangeInputField} value={inputField.skill_earned.join(', ')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>

  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="start_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Staring From</label>
      <input type="date" id="start_year" name='start_year' value={inputField.start_year } onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <div className="mb-5">
      <label htmlFor="end_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending To</label>
      <input type="date" id="end_year" name='end_year' value={inputField.end_year} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  
  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
  <label htmlFor="detail" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Detail</label>
  <textarea  id="detail" rows= {6}  name='detail' onChange={onChangeInputField} value = {inputField.detail ?? ''}   className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anything you want to add ..."></textarea>
  </div>
  </div>

  <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Experience</button>
  
</form>
</div>
  )
}

export default Experience;