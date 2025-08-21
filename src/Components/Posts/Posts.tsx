import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import image1 from '../../assets/image (1).jpg'

import { firebaseContext} from '../../store/context';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/postContext';


interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  createdAt:Date;
}

function Posts() {
const firebase =useContext(firebaseContext)
const {postDetails,setPostDetails} =useContext(PostContext)
const [product,setProducts]=useState<Product[]>([])
const db=getFirestore(firebase)
const navigate=useNavigate()

useEffect(()=>{
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "product")); // Fetch all documents in "product"
      const productsList:Product[] = [];
      querySnapshot.forEach((doc) => {
        // console.log({...doc.data()});
        const data = doc.data(); 
        productsList.push({  id:data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          image: data.image,
          createdAt:data.createdAt.toDate()});
      });
      setProducts(productsList); // Update state with the fetched products
      console.log("Products fetched:", productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts(); 
  
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
      {product.map((product, index)=>{
      return     <div key={(product as any).docId || product.image + index} onClick={()=>{ setPostDetails(product); navigate("/view"); }}
      className="card">
      <div className="favorite">
        <Heart></Heart>
      </div>
      <div className="image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="kilometer">{product.name}</span>
        <p className="name">130km</p>
      </div>
      <div className="date">
      <span>{(product.createdAt).toDateString()}</span>

      </div>
    </div>
      })
      }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={image1} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
