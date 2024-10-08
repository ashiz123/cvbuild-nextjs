'use client'
import { useEffect, useState } from "react";
import Jumbotron from "../Components/jumbotron";
import MasterLayout from "../Components/masterLayout";
import axios from "axios";




export default function Home() {



return (
   <div>
    <MasterLayout>
    <Jumbotron></Jumbotron>
    </MasterLayout>   
    </div>
  );
}

