'use client';
import React from 'react'
import Navigation from './navigation';
import footer from './footer';
import { usePathname, useSearchParams } from 'next/navigation'
import {AuthProvider} from '../Contexts/AuthContext';

interface masterLayout{
    children : React.ReactNode
}


const MasterLayout: React.FC<masterLayout>= ({children})  =>{

  const pathname = usePathname();
  const banner = `${pathname == '/' ? '' : 'container mx-auto'}`;
 
  return (
   <div>
        <Navigation />
        <main className= {banner}>
            {children}
        </main>
        </div>
  )
}

export default MasterLayout;
