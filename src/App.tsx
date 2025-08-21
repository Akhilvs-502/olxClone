import React, { useContext, useEffect } from 'react';
import './App.css';

import  Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { AuthContext } from './store/context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebase } from './fireBase/config';
import Create from './Components/Create/Create';
import {ToastContainer, toast } from "react-toastify";
import View from './Components/View/View';
import Post from './store/postContext';

function App() {
  const authObject=useContext(AuthContext)
  if(!authObject){
    return null
  }
  const {setUser}=authObject
  const auth=getAuth()
  useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log(user);
          
        setUser(user)
        }else{
          console.log("user is sign out");
        }
      })
  },[])
  return (
    <div>
      <Post>

      <BrowserRouter> 
    <ToastContainer  theme='dark'/>
      <Routes>
       <Route path='/'  element={<Home/>} ></Route>
       <Route path='/signup' element={<Signup/>}></Route>
       <Route path='/login' element={<Login/>}></Route>
       <Route path='/create' element={<Create/>}></Route>
       <Route path='/view' element={<View/>}></Route>
      </Routes>
   
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
