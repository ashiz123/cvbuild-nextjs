'use client'
import React, { useEffect, useState } from 'react'

interface InputProps{
   name: string;
}
interface UserInterface{
    firstname: string;
    lastname: string;
    email:string;
    phone: string;
}

const Input : React.FC<InputProps> = ({name}) => {
const[formData, setFormData] = useState<UserInterface[]>([]);

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(()=> {
    console.log(formData)
  })



    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">{name}</label>
              <div className="mt-2">
                <input type="text" name={name} onChange={handleInputChange} id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
        </div>
      )
}  

export default Input;





