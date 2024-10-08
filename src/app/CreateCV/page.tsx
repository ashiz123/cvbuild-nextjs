'use client';
import React, { useContext, useEffect, useState } from 'react'
import MasterLayout from '../Components/masterLayout'
import PersonalInformation from '../Components/personalInformation'
import CvTemplate from '../Components/cvTemplate'
import Qualification from '../Components/qualification'
import Skills from '../Components/skills'
import MyButton from '../Components/myButton';
import Experience from '../Components/experience';
import {InformationContext} from '../../context/InformationContext'
import { useAuth } from '../Contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ExperienceInterface } from '../Components/experience';

 interface ValidationError{
  type : string;
  value : any[];
  msg : string;
  path : string; 
  location : string;
}



export default function page() {
  const router = useRouter();
  const {auth} = useAuth();
  const [validations, setValidations] = useState<ValidationError[]>([]);
  

 
useEffect(() => {
  if(auth == undefined)
  {
    router.push('/Login-user');
  }
},[auth, router])



// const authInfo = JSON.stringify(auth); in case you need to convert object to

 const {personalInfo, skills,  qualifications, experiences, currentStep, previousStep, nextStep} = useContext(InformationContext);


//  //  use of  json.stringify to only skill_earned.
const jsonExperiences = experiences.map((experience: ExperienceInterface)=> ({
  ...experience,
  skill_earned: JSON.stringify(experience.skill_earned) // Convert `skill_earned` to JSON string
}));



 const datas =  {
      auth,
      personalInfo,
      skills,
      qualifications,
      jsonExperiences
    }

    
   


   const storeCv = async() => {
    await axios.post('http://localhost:3001/cv/store', datas)
   .then(response => {
     console.log('response:', response);
     router.push('/CvLayout');
   })
   .catch(error => {
     console.error('Error:', error.response.data.errors);
     const errorResponse = error.response?.data?.errors || [];
      setValidations(errorResponse);
   })
 }





return (
    // added context from this level
  
    <MasterLayout>
      <div className="flex flex-row">
        <div className="basis-1/2 p-3">
          <div className={`${currentStep ===1 ? 'block' : 'hidden'}`}>
          <PersonalInformation validate = {validations}/>
          </div>
          <div className={`${currentStep ===2 ? 'block' : 'hidden'}`}>
          <Qualification/>
          </div>
          <div className={`${currentStep ===3 ? 'block' : 'hidden'}`}>
          <Skills/>
          </div>
          <div className={`${currentStep ===4 ? 'block' : 'hidden'}`}>
          <Experience/>
          </div>

          <div className='pr-10'>
          <MyButton label='Go Previous'  className="px-4 py-2 bg-blue-500 text-white rounded" onClick={previousStep} />
          {
            currentStep == 4 ?
            <MyButton  className="float-right px-4 py-2 bg-green-500 text-white rounded" label='Submit CV' onClick={ storeCv } />
            :
            <MyButton  className="float-right px-4 py-2 bg-blue-500 text-white rounded" label='Go Next' onClick={nextStep} />
          }
          
          
          </div>
          </div>
        <div className="basis-1/2 p-3" >
          <section>
            <CvTemplate validate = {validations}/>
          </section>
          </div>
      </div>
    </MasterLayout>
  
    
  )
}
