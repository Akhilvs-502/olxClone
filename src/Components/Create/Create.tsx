import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getFirestore } from 'firebase/firestore';
import { AuthContext, firebaseContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const firebase = useContext(firebaseContext);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  if (!firebase) {
    console.log("firebase instance err");

    return
  }
  const db = getFirestore(firebase)

  
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;



  if (!cloud_name) {
    throw new Error("REACT_APP_CLOUDINARY_CLOUD_NAME is not defined!");
  }

  // Submit function to handle form submission
  const imageStore = async (event: React.FocusEvent) => {
    event.preventDefault()
    let widget = window.cloudinary.createUploadWidget({
      cloudName: cloud_name,
      uploadPreset: `olx-clone`
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result.info.url);
        setImage(result.info.url);
      }
    });
    widget.open()
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !price || !category) {
      toast.error("*please fill empty input")
      return
    }
    if (!image) {
      toast.error("upload image")
      return
    }

    const docRef = await addDoc(collection(db, "product"), {
      id: user.uid,
      name, category, price,
      image,
      createdAt: new Date()
    })
    navigate("/login")
    console.log(docRef);


  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image}></img>
          <form>
            <br />
            <button className='fileuploadbtn' onClick={(e => imageStore(e))} >select image</button>
            <br />
            <button onClick={submit} className="uploadBtn">
              Upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
