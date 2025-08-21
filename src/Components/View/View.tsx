import React, { useContext, useEffect, useState } from 'react';
import image1 from '../../assets/image (1).jpg';
import './View.css';
import Header from '../Header/Header';
import { PostContext } from '../../store/postContext';
import { firebaseContext } from '../../store/context';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function View() {
  const [userDetails, setUserDetails] = useState<any[]>();
  const { postDetails } = useContext(PostContext) || {} as any;
  const firebase = useContext(firebaseContext);
  const navigate = useNavigate();
  const userID = postDetails?.id;
  const db = firebase ? getFirestore(firebase) : undefined;

  useEffect(() => {
    if (!postDetails) {
      navigate('/');
      return;
    }
    const fetchUserDetails = async () => {
      try {
        if (!db || !userID) return;
        const productsRef = collection(db, 'olxUser');
        const q = query(productsRef, where('id', '==', userID)); // Match the user by ID
        const querySnapshot = await getDocs(q);
        const matchedProducts: any[] = [];
      
        querySnapshot.forEach((doc) => {
          console.log({...doc.data()});
          matchedProducts.push({  ...doc.data() }); // Add matching product data
        });
        
        setUserDetails(matchedProducts); // Set the state with the fetched data
        
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userID) {
      fetchUserDetails();
    }
  }, [userID, db, navigate, postDetails]);

  return (
    <>
      <Header />
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          {postDetails && (
            <img src={postDetails.image } alt="product" />
          )}
        </div>
        <div className="rightSection">
          <div className="productDetails">
            {postDetails && (
              <>
                <p>&#x20B9; {postDetails.price}</p>
                <span>{postDetails.name}</span>
                <p>{postDetails.category}</p>
                <span>{postDetails.createdAt && (postDetails.createdAt as Date).toDateString()}</span>
              </>
            )}
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.[0]?.username || 'No name'}</p>
            <p>{userDetails?.[0]?.phone || '1234567890'}</p>
            <p>{userDetails?.[0]?.email || '123@gmail.com'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
