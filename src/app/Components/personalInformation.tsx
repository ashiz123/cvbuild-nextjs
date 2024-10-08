'use client';
import React, { useState , useContext, useEffect} from 'react'
import { InformationContext } from '@/context/InformationContext';
import {useAuth} from '../Contexts/AuthContext';
import axios from 'axios';

interface inputInterface{
  firstname : string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  jobtitle: string,
  profile: string
}

interface AuthType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token?: string; // Optional if needed
}

interface ValidationError {
  msg: string;
  path: string;
}

interface PersonalInformationProps {
  validate: ValidationError[];
}


const PersonalInformation: React.FC<PersonalInformationProps> = () => {

  
 
  // const jsonValidate = JSON.stringify(validate, null, 2)

    const[inputField, setInputField] = useState<inputInterface>({
      firstname : '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      jobtitle: '',
      profile: '',
    }); 


    const {updateData} = useContext(InformationContext);
    // console.log(validate);
    // const [errors, setErrors] = useState(validate || {});

    // explicitly typed auth
    const { auth, loading, error, token}: { auth: AuthType | null; loading: boolean; error: any; token:AuthType | null } = useAuth();
  

    //new
    useEffect(() => {
      const fetchUserPersonalInfo = async() => {
        if(token)
        {
          const response = await axios.get('http://localhost:3001/profile/personal_details' , {
            headers : {
              'Authorization': `Bearer ${token}`
            }
          });
          

          let address = '';
          let phone = '';
          let jobtitle = '';
          let profile = ''
      
          if (response.data.profile && response.data.profile.length > 0) {
               address = response.data.profile[0].address || '';
               phone = response.data.profile[0].phone_number || '';
              jobtitle = response.data.profile[0].job_title || '';
              profile = response.data.profile[0].profile || '';
          }


          if(auth){
            const initialData : inputInterface = {
              firstname : auth.firstname || '',
              lastname : auth.lastname || '',
              email : auth.email || '',
              address: address,
              phone: phone,
              jobtitle: jobtitle,
              profile: profile
            }
            setInputField(initialData);
            updateData(initialData);
          }
        }
        else{
          console.log('user is not logged in');
        }
       
      }

      fetchUserPersonalInfo();
      
    }, [auth,token])

    // useEffect(() => {
    //   if (validate && Array.isArray(validate)) {
    //     const newErrors = validate.reduce((acc: { [key: string]: string }, curr: any) => {
    //       if (curr.type === 'field') {
    //         acc[curr.path] = curr.msg;
    //       }
    //       return acc;
    //     }, {});
    //     setErrors(newErrors);
    //   }
    // }, [validate]);
  

  



    function onChangeInputField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
      const {name, value} = event.target;
      setInputField(prevData => ({
        ...prevData, [name]: value
      }))

      updateData({[name]: value});
    }

    // console.log(errors);


return (
    <div className='p-6'>
      <br />
 <h1 className="text-4xl font-bold mb-2 ">Personal Information</h1>
<form className="max-w-md  p-3">
  
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
       <input type="text" id="firstname" name='firstname' value= {inputField.firstname}  onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       
  </div>
  <div className="mb-5">
      <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
      <input type="text" id="lastname" name='lastname' value= {inputField.lastname} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
      <input type="number" id="phone" name='phone' value={inputField.phone} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <div className="mb-5">
      <label htmlFor="jobtitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
      <input type="text" id="jobtitle" name='jobtitle' value={inputField.jobtitle} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      
  </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
      <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
      <input type="text"   id="address" name='address' value={inputField.address} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
      <input type="email"  disabled id="email" name='email' value={inputField.email} onChange={onChangeInputField} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  </div>

  <div className="grid md:grid-cols-1 md:gap-6">
  <div className="mb-5">
  <label htmlFor="profile"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Profile</label>
  <textarea id="profile" rows={6} value ={inputField.profile}  name='profile' onChange={onChangeInputField}   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write about you..."></textarea>
  </div>
  </div>
  
</form>
</div>
  )
}

export default PersonalInformation;
