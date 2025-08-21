import { createContext, ReactNode, useState } from "react";

interface IpostContext{
    postDetails: IPostDetails | null;
    setPostDetails: React.Dispatch<React.SetStateAction<IPostDetails | null>>;
}

export interface IPostDetails {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    createdAt: Date;
}
  interface PostProps {
    children: ReactNode; // Type children as ReactNode
  }
 export const PostContext=createContext<IpostContext |null>(null)

function Post({children}:PostProps){
const [postDetails,setPostDetails]=useState<IPostDetails | null>(null)

    return (
        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post