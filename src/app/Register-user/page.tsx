'use client';
import React, { useState } from 'react';
import MasterLayout from '../Components/masterLayout';
import axios from "axios";
import { useRouter } from 'next/navigation';


export interface UserInterface{
  first_name : string,
  last_name : string,
  email : string,
  password: string,
  confirm_password: string
}

export default function page() {
  const initialFormField: UserInterface = {
    'first_name' : '',
    'last_name' : '',
    'email' : '',
    'password' : '',
    'confirm_password' : ''
  }

  const[inputField, setInputField] = useState<UserInterface>(initialFormField)
  const[error, setError] = useState(null);
  const router = useRouter();
  // const[success, setSuccess] = useState(false);

  function onChangeInputField(event: React.ChangeEvent<HTMLInputElement>)
  {
    const {name, value} = event.target;
    setInputField((prevState) => ({...prevState, [name]: value}))
  }


  const submitUser = async(event: React.ChangeEvent<HTMLFormElement>) => 
  {
    event.preventDefault();
    // console.log(inputField);
    try{
      const response = await axios.post('http://localhost:3001/auth/register', inputField, {
        headers : {
          'Accept': 'application/json',
        }
       });
      setInputField(initialFormField);
      if(response.status == 201)
      {
        router.push('/Login-user');
      }
      
    }

    catch(err){
      setError(err);
    }

  }


if (error) return <div>Error: {error.message}</div>;

  return (
    <MasterLayout>
     <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center  my-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register User
              </h1>
              <form className="max-w-sm mx-auto " onSubmit={submitUser}>
                <div className="grid md:grid-cols-2 md:gap-6">
                 
                  <div className="mb-5">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input type="text" name='first_name' id="first_name" value={inputField.first_name} onChange={onChangeInputField} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="First Name" required />
              </div>
                  
                 
                  <div className="mb-5">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input type="text" name='last_name' id="last_name" value={inputField.last_name} onChange={onChangeInputField} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Last Name" required />
              </div>
                  

                </div>
             
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input type="email" id="email" name="email" value={inputField.email} onChange={onChangeInputField} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" name='password' value={inputField.password} onChange={onChangeInputField} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" id="confirm-password" name='confirm_password' value={inputField.confirm_password} onChange={onChangeInputField} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </MasterLayout>
  )
}
