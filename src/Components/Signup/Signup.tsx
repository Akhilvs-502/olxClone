import React, { useContext, useState } from 'react';
import Logo from '../../../olx-logo.png';
import './Signup.css';
import { firebaseContext } from '../../store/context';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default  function Signup() {
  const navigate=useNavigate()
  const [username,SetUsername]=useState<string>("")
  const [password,SetPasword]=useState<string>("")
  const [email,SetEmail]=useState<string>("")
  const [phone,SetPhone]=useState<string>("")
  const firebase=useContext(firebaseContext)
  const handleSubmit=((event:React.FormEvent)=>{
    event.preventDefault()    
if(!firebase){
  console.error("Firebase is not initialized");
  return
}

if(!username || !phone){
   toast.error("*please fill empty input")
  return 
}

  let db=getFirestore(firebase)
  let auth=getAuth(firebase)
  
  createUserWithEmailAndPassword(auth,email,password).then( async (userCredential)=>{
    const user=userCredential.user
   await updateProfile(user,{
      displayName:username
    })

    const docRef=await addDoc(collection(db,"olxUser"),{
      id:user.uid,
      username:username,
      phone,email
    })
    console.log("Document written with ID: ", docRef.id);

    navigate("/login")

  }).catch((err)=>{
    alert(err)
     toast.error(err)

  })
  

  })
  return (
    <div>
      <div className="signupParentDiv">
        <img width="300px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{SetUsername(e.target.value)}}
            defaultValue=""
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{SetEmail(e.target.value)}}

            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{SetPhone(e.target.value)}}
            name="phone"
     
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{SetPasword(e.target.value)}}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate("/login")}}>Login</a>
      </div>
    </div>
  );
}
