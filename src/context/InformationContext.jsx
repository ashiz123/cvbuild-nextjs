'use client';
import React, {createContext, useState} from "react";


export const InformationContext = createContext();

export const InformationProvider = ({children}) => {
    const [personalInfo, setPersonalInfo] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [qualifications, setQualifications] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([])


    const updateData = (newState) => {
        setPersonalInfo((prevState) => ({
            ...prevState, ...newState
        }));
       
    }

    const previousStep = () => {
         if(currentStep > 1){
            setCurrentStep(currentStep - 1);
        }
        else
        {
        console.log('steps cant go less than 1')
        }
    }

    const nextStep = () => {
       if(currentStep < 4){
            setCurrentStep( currentStep + 1);
        }
     }



    const addQualificationList = (qualification) => {
        setQualifications((prevItems) => [...prevItems, qualification]);
        
    }


    const addSkillList = (skill) => {
        setSkills((prevItems) => [...prevItems, skill]);
    }


    const addExperienceList = (experience) => {
        setExperiences((prevItems) => [...prevItems, experience])
    }

    const values = {
        personalInfo, 
        updateData,
        skills, 
        qualifications, 
        experiences, 
        addExperienceList, 
        addQualificationList, 
        addSkillList, 
        currentStep,
        previousStep, 
        nextStep, 
        setQualifications,
        setExperiences,
        setSkills

    }



    return (
        <InformationContext.Provider value= {values} >
            {children}
        </InformationContext.Provider>
    );
    
}



