import React, { useContext, useEffect, useState } from 'react'
import { InformationContext } from '@/context/InformationContext';
import {useAuth} from '../Contexts/AuthContext';
import axios from 'axios';


interface SkillInterface
{
  skill_name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  yearsOfExperience : number;
  description?: string;
}

interface AuthType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token?: string; // Optional if needed
}

const initialSkillState : SkillInterface = {
  skill_name : '',
  level : 'beginner',
  yearsOfExperience : 0,
  description : ''
}


const Skills : React.FC = () =>{
  const[inputField, setInputField] = useState<SkillInterface>(initialSkillState);
  const {addSkillList, setSkills} = useContext(InformationContext);
  const { auth, loading, error, token}: { auth: AuthType | null; loading: boolean; error: any; token:AuthType | null } = useAuth();

  useEffect(() => {
    const fetchUserSkill = async() => {
      if(token){
        try{
          const response = await axios.get('http://localhost:3001/profile/skills', {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          })
        
          const skillData = response.data.skills;
          console.log('skills', skillData);
          setSkills(skillData);
         }
        catch(error)
        {
          console.error('Error fetching qualification data:', error);
        }
      }
    }

    fetchUserSkill();

  }, [token, setSkills])
 


  function onChangeInputField(event:React.ChangeEvent<HTMLInputElement>)
  {
    // console.log(event.target.value);
    const {name, value} = event.target;
      setInputField((prevState) => ({
        ...prevState, [name]: value
      }))

  }

  function addSkill(event:React.MouseEvent<SVGSVGElement, MouseEvent>)
  {
    event.preventDefault();
    if(inputField)
      {
        addSkillList(inputField);
        setInputField(initialSkillState);
      }
      else{
        console.log('no string found')
      }
    
    
  }

return (
    <div className='p-6'>
      <br />
 <h1 className="text-4xl font-bold mb-2 ">Skills</h1>
 <form>
 <div className="w-2/3 flex justify-end items-center relative">
    <input
       placeholder="Add skill"
       className="border border-gray-400 rounded-lg p-4 w-full"
       name='skill_name'
       value={inputField.skill_name}
       onChange={onChangeInputField}
    />
   
    <div className="absolute mr-2 w-10">
      <svg xmlns="http://www.w3.org/2000/svg" onClick={addSkill} className="skill_plus_icon absolute mr-2 w-10 size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </div>
    
  </div>
</form>
</div>
  )
}


export default Skills;



