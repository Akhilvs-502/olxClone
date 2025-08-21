import React, { Suspense, useCallback, useContext, useState } from 'react';

import Logo from '../../assets/OlxLogo';
import './Login.css';
import { firebaseContext } from '../../store/context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Post from '';

// const ComponetLazy=React.lazy(()=>{"../../store/postContext"})


// const [names,setNames]=useState([])

// // let array=array.push({name1:"akhil",name2:"appu"})
// setNames(array)

// console.log(names);




function Login() {

  const navigate=useNavigate()
  const firebase=useContext(firebaseContext)
  
  const handleEvent=(event:React.FormEvent)=>{
    event.preventDefault()
    if(!firebase){
      console.error("Firebase is not initialized");
      return
    }
    
      let db=getFirestore(firebase)
      let auth=getAuth(firebase)
    signInWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
      navigate("/")

    }).catch((err)=>{
       toast.error(err.message)
    })
    
  }
  
  const [email,SetEmail]=useState<string>("")
  const [password,SetPasword]=useState<string>("")

const callHandler=useCallback(()=>{
        SetPasword((prev)=>prev+1)
},[])


  return (
    <div>
      {/* <Suspense>
        <ComponetLazy */}
      <div className="loginParentDiv">
          
        <Logo width="200px" height="200px"  ></Logo>

        <form onSubmit={handleEvent}>
          <label htmlFor="fname" >Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetEmail(e.target.value)}
            />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPasword(e.target.value)}
            />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate("/signup")}}>Signup</a>
      </div>
            {/* </Suspense> */}
    </div>
  );
}

export default Login;
