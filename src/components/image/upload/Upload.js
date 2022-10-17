import React, { useState , useEffect } from 'react'
import firebase from 'firebase/compat/app'
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL 
} from "firebase/storage";
import { ref, runTransaction, getDatabase, set , onValue , get, onChildAdded, onChildChanged, onChildRemoved  } from 'firebase/database'
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { realDB } from '../../../util/initImage';
import 'firebase/database'
import 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { Form, Button } from 'react-bootstrap';



function Upload() {

    const [category, setCategory] = useState('');

    const submitCategory = (e) => {
        e.preventDefault();
        const id = uuidv4();
    
        const db = getDatabase();
          set(ref(db, `category/${id}`), {
            id: id,
            category: category
          }).then(res => {
            setCategory('')
            // setisSuccess(true)
          })
    
      }
  return (
    <div>Upload
         <Form.Label htmlFor="inputPassword5">Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder='Enter the Category'
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button variant="primary" onClick={(e) => submitCategory(e)} className='mt-2'>Create</Button>
    </div>
  )
}

export default Upload