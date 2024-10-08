'use client';
import React, { useEffect } from 'react'
import MasterLayout from '../Components/masterLayout'
import CvTemplate from '../Components/cvTemplate'
import { useAuth } from '../Contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function page() {

    const {auth} = useAuth();
    const router = useRouter();


    useEffect(() => {
        if(auth == undefined)
        {
          router.push('/Login-user');
        }
        
      },[auth, router])



  return (
    <MasterLayout>
        <div className="flex flex-row">
        <div className="basis-3/4 p-3">
        <CvTemplate>
        </CvTemplate>
        </div>

        <div className="basis-1/4 p-3">
        Templates
        </div>
        </div>
   
    </MasterLayout>
  )
}
