import React, { createContext, ReactNode, useState } from "react";
import { FirebaseApp } from "firebase/app";  // ts type for createContext
import { User } from "firebase/auth";
interface IcontextProps{ children:ReactNode }
interface IauthContext{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>>; }



export const firebaseContext=createContext<FirebaseApp | undefined>(undefined)
export const AuthContext=createContext<IauthContext |null>(null)

 export const  Context=(props:IcontextProps)=>{
    let {children}=props
    const [user,setUser]=useState<User | null>(null)
 return (
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
 )
}
