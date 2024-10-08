'use client';
import React, {useContext, useEffect, useState} from 'react'
import {InformationContext} from '../../context/InformationContext'
import { QualificationInterface } from './qualification';
import { ExperienceInterface } from './experience';
import MyButton from './myButton';
import { usePDF } from 'react-to-pdf';
import { useRouter } from 'next/navigation';


interface ValidationError {
  msg: string;
  path: string;
  type: string;
}


interface cvTemplateProps {
  validate: ValidationError[];
}

interface PersonalInfoValidationType{
  phone ?:string;
  address ?:string;
  jobtitle ?: string;
  profile ?:string;
}

interface ValidationType{
  jsonExperiences?: string;
  qualifications?: string;
  skills?: string;
  personalInfo?: PersonalInfoValidationType;
}

interface ErrorsState {
  [key: string]: string;
}

interface BuildNestedErrorsResult{
  nestedErrors : ValidationType;
  counter : number;
}


//Tough function , need to review
function buildNestedErrors(errors: ValidationError[]): BuildNestedErrorsResult {
  const nestedErrors: ValidationType = {};
  var counter: number = 0;

  errors.forEach(error => {
    if (error.type === 'field') {
      const pathParts = error.path.split('.');
      let current = nestedErrors as any; // `as any` allows dynamic property assignment
      counter++;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      current[pathParts[pathParts.length - 1]] = error.msg;
    }
  });
   return {nestedErrors, counter};
}



const CvTemplate: React.FC<cvTemplateProps> = ({validate})=> {
  const {personalInfo, qualifications, skills, experiences} = useContext(InformationContext);
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const [errors, setErrors] = useState<ValidationType>({});
  const [itemCount, setItemCount] = useState<number>();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');
  const templatePath = 'http://localhost:3000/CvLayout';
  // Get the current URL
 
 


  //validation 
  useEffect(() => {
    if (validate && Array.isArray(validate)) {
      const newErrors = buildNestedErrors(validate);
      if (newErrors) {
        setErrors(newErrors.nestedErrors);
        setItemCount(newErrors.counter);
      }
    } else {
      // Handle cases where validate is not an object or is empty
      setErrors({});
      setItemCount(0);
    }
    }, [validate]);

    useEffect(() => {
      if(typeof window != 'undefined')
      {
        const fullUrl = window.location.href; // Get the full URL
        setCurrentUrl(fullUrl);
      }
    }, [router])
    

  const experienceErrors = JSON.stringify(errors['jsonExperiences'], null, 2);
  
    
    console.log(currentUrl);
    

  function saveCV()
    {
      console.log('save cv');
    }

    function printCV()
    {
      console.log('print cv');
    }

  return (
    <div className='p-6'>
    
    <br />
    <h1 className="text-4xl font-bold mb-2 text-teal-500 text-center">Curriculum Vitae</h1>
    {/* // personal infomation */}
    {
      itemCount && itemCount > 0 ? <h3 className='text-red-500 text-lg'>Please complete all fields marked in red.</h3> : ''
    }
    <div ref={targetRef}>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-5">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-2">{personalInfo.firstname ? personalInfo.firstname : ' firstname -' } {personalInfo.lastname ? personalInfo.lastname : 'lastname'}</h1>
      {
        errors.personalInfo?.address ? <p className="text-red-500 text-sm"> {'Address is required'} </p> :
        <h2 className="text-lg text-gray-600">{personalInfo.address ? personalInfo.address : 'Address'}</h2>
      }
     
      {/* {
        errors.personalInfo?.jobtitle ? <p className="text-red-500 text-sm"> {'<<<Job Title Required>>>'} </p>  : 
        <p className="text-lg text-gray-600">{personalInfo.jobtitle ? personalInfo.jobtitle : '<<<Job Title>>>'}</p>
      } */}
      <p className="text-lg text-gray-600">{personalInfo.jobtitle ? personalInfo.jobtitle : '<<<Job Title>>>'}</p>
     
      <p className="text-gray-600">Email: {personalInfo.email} </p>
      <p className="text-gray-600">Phone: {personalInfo.phone} </p>

      {/* {
        errors.personalInfo?.phone ? <p className="text-red-500 text-sm"> {'Phone number is required'} </p> :
        <p className="text-gray-600">Phone: {personalInfo.phone} </p>
      } */}
     
    </header>

 {/* profile */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Profile</h2>
      <div>
        {personalInfo.profile ? personalInfo.profile : <h4 className="text-xl font-semibold text-gray-500">Add your profile here</h4>}
      </div>
      {errors.personalInfo?.profile && <p className="text-red-500 text-sm">{errors.personalInfo?.profile}</p>}
    </section>

   {/* Experience */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Experience</h2>

      {
       experiences.length > 0?
        experiences.map((experience:ExperienceInterface, i:number) => {
          return(
          <div className="mb-5" key={i}>
            <h3 className="text-xl font-semibold">{experience.title} at {experience.company_name}</h3>
            <p className="italic">{experience.start_year} <span className='font-bold'> &nbsp; &nbsp; to &nbsp; &nbsp;  </span> to {experience.end_year}</p>
            <p>
                {experience.detail}
            </p>
            <div className='mt-2'>
              <h4 className='font-bold'>Skill Learned</h4>
              <ul>
                {
                  experience.skill_earned.map((skill, i:number) => {
                    return(
                        
                          <li key={i}>
                            {skill}
                          </li>
                        
                    )
                  })
                }
               </ul>
              
            </div>
         </div>
          )
        }) :
        <div className="mb-4">
        <h4 className="text-xl font-semibold text-gray-500">Add your experience here</h4>
        {experienceErrors && <p className="text-red-500 text-sm">{experienceErrors}</p>}
      </div>

      }
      
     
    </section>

   

  {/* Qualification  */}
     <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Education</h2>
      <div>
      {
        qualifications.length>0 ?
      qualifications.map((qualification:QualificationInterface, id:number) => {
        return (
          <div key={id}>
             <h3 className="text-xl font-semibold">{qualification.field_of_study}</h3>
             <p className="italic">{qualification.university}  {qualification.end_year}</p>
             <p>{qualification.detail}</p>
          </div>
        )
      }):
      <div className="mb-4">
      <h4 className="text-xl font-semibold text-gray-500">Add your qualification here</h4>
      {errors['qualifications'] && <p className="text-red-500 text-sm">{errors['qualifications']}</p>}
    </div>
    }
    </div>
    </section>
    

    {/* skills */}
    <section>
      <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Skills</h2>
      <ul className="list-disc list-inside">
        {
          skills.length > 0 ?
          skills.map((skill:string, i:number) => {
            return (
              <li key={i}>{skill.skill_name}</li>
            )
          }):
          <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-500">Add your skill here</h4>
          {errors['skills'] && <p className="text-red-500 text-sm">{errors['skills']}</p>}
        </div>
        }
        </ul>
    </section>

    
    </div>
    </div>

    {
      currentUrl === templatePath  &&
      <div className='pr-10 mt-5'>
       <MyButton label='Save' onClick={() => toPDF()} className="px-4 py-2 bg-blue-500 text-white rounded m-1"  />
       <MyButton  className=" px-4 py-2 bg-blue-500 text-white rounded m-1" label='Print' onClick={printCV} />
    </div>

    }
  
    
  </div>
 
  )
}

export default CvTemplate;
