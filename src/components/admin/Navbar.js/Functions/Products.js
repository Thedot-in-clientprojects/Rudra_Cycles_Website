import React, { useState, useEffect }  from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from 'react-bootstrap/Alert';
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
import { realDB } from '../../../../util/initFirebase';
import 'firebase/database'
import 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { TextareaAutosize } from '@mui/base';
import FileUpload from "react-mui-fileuploader"


function Products() {

    const [category, setCategory] = useState('');


    const [productName, setproductName] = useState('');
    const [productCategory, setproductCategory] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productDiscPrice, setproductDiscPrice] = useState('');
    const [productCycleType, setproductCycleType] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [productBrand, setproductBrand] = useState('');
    const [productColor, setproductColor] = useState('');
    const [productOverview, setproductOverview] = useState('');
    const [productTopSpeed, setproductTopSpeed] = useState(''); 
    const [productSize, setproductSize] = useState('');
    const [productRatings, setproductRatings] = useState('');
    const [productFav, setproductFav] = useState('');
    const [productisAvail, setproductisAvail] = useState(false);
    const [productisStock, setproductisStock] = useState(false);
    const [productisSoldOut, setproductisSoldOut] = useState(false);
    const [productisOffer, setproductisOffer] = useState(false);




  const handleChange = (event) => {
    setproductCategory(event.target.value);
  };


  const handleBranch = (event) => {
    setproductBrand(event.target.value);
  };

  const handleCycleFrame = (event) => {
    setproductSize(event.target.value)
  }

  const handleCycleType = (event) => {
    setproductCycleType(event.target.value);
  };

  const successAlert = () => {
    if(isSuccess)
    return(
      <Alert key={'success'} variant={'success'}>
        Your Upload is Successful
    </Alert>
    )
  }

  const [isSuccess, setisSuccess] = useState(false);
  useEffect(() => {
      if(isSuccess){
        setTimeout(() => {
          setisSuccess(false)
      }, 3000);
    }
    getAllCategories()
  }, [isSuccess])
  

  const submitCategory = (e) => {
    e.preventDefault();
    const id = uuidv4();

    const db = getDatabase();
      set(ref(db, `category/${id}`), {
        id: id,
        category: category
      }).then(res => {
        setCategory('')
        setisSuccess(true)
      })

  }

  const submitProduct = (e) => {
    e.preventDefault();
    const id = uuidv4();

    const db = getDatabase();
    set(ref(db, `product/${id}`), {
      id: id,
    }).then(res => {
      setisSuccess(true)
    })
  }


  const [productImage, setproductImage] = useState('');
  const [productImageURL, setproductImageURL] = useState('');
  const [progressing, setprogressing] = useState(false);
  const [imageUploadMainDone, setimageUploadMainDone] = useState(false);


  const [productSecondImage, setproductSecondImage] = useState('');
  const [productImageMainURL, setproductImageMainURL] = useState('');
  const [progressingMain, setprogressingMain] = useState(false);
  const [imageUploadSecondDone, setimageUploadSecondDone] = useState(false);

  const productImageHandle = (e) =>{
    setproductImage(e.target.files[0])
  }

  const uploadProductMain = (e) => {

          e.preventDefault(); // prevent page refreshing

          let file = productImage;
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var uploadTask = storageRef.child(`product/image/${uuidv4()}/${file.name}`).put(file);
        
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
              var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
              setprogressing(true)
            },(error) =>{
              throw error
            },() =>{
              // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        
              uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                setproductImageURL(url)
                setprogressing(false)

              })
  }
)}

  const getAllProducts = () => {

  }


  const [allCategories, setallCategories] = useState([]);
  
  const getAllCategories = () => {
    const db = getDatabase();
    const categories = ref(db, 'category/');
    onValue(categories, (snapshot) => {
        const data = snapshot.val();
        setallCategories(data);
      });
}



const handleFileUploadError = (error) => {
  // Do something...
}

const handleFilesChange = (files) => {
  // Do something...
}


  return (
    <div>
      {
        successAlert()
      }
        <h2 style={{
          marginTop:15,
          marginLeft:22
        }}>
            Products
        </h2>
        <div className='container'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Catgory</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Product</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Manage</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div>
              <Form.Label htmlFor="inputPassword5">Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder='Enter the Category'
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button variant="primary" onClick={(e) => submitCategory(e)} className='mt-2'>Create</Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div>
              <Form.Label htmlFor="inputPassword5">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter Product Name'
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                />
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">
      
                 <Form.Label htmlFor="inputPassword5">Select the Brand</Form.Label>
      
<Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={productBrand}
    label="Branch"
    onChange={handleBranch}
>
            <MenuItem value={'Brand One'}>Brand One</MenuItem>
            <MenuItem value={'Brand Two'}>Brand Two</MenuItem>
            <MenuItem value={'Brand Three'}>Brand Three</MenuItem>
            <MenuItem value={'Brand Four'}>Brand Four</MenuItem>
            <MenuItem value={'Brand Five'}>Brand Five</MenuItem>
            <MenuItem value={'Brand Six'}>Brand Six</MenuItem>
     
</Select>
</FormControl>
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">
      
                 <Form.Label htmlFor="inputPassword5">Select the Brand</Form.Label>
      
<Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={productCycleType}
    label="Branch"
    onChange={handleCycleType}
>
            <MenuItem value={'Brand One'}>Brand One</MenuItem>
            <MenuItem value={'Brand Two'}>Brand Two</MenuItem>
            <MenuItem value={'Brand Three'}>Brand Three</MenuItem>
            <MenuItem value={'Brand Four'}>Brand Four</MenuItem>
            <MenuItem value={'Brand Five'}>Brand Five</MenuItem>
            <MenuItem value={'Brand Six'}>Brand Six</MenuItem>
     
</Select>
</FormControl>
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">
              <Form.Label htmlFor="inputPassword5">Select the Category</Form.Label>

                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={productCategory}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {allCategories && Object.entries(allCategories).map((cate, index) => {
                        return(
                            <MenuItem value={cate[1].category}>{cate[1].category}</MenuItem>
                        )
                    })
                    }
                </Select>
                </FormControl>
                <InputLabel id="demo-select-small"></InputLabel>

              <Form.Label htmlFor="inputPassword5">Enter the Price</Form.Label>
                
              <Form.Control
                type="text"
                placeholder='Enter product price'
                value={productPrice}
                onChange={(e) => setproductPrice(e.target.value)}
                />
              <Form.Label htmlFor="inputPassword5">Enter the Discount Price</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter product price'
                value={productDiscPrice}
                onChange={(e) => setproductDiscPrice(e.target.value)}
                />
              <Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Description</Form.Label>
                
              <TextareaAutosize
                type="textarea"
                minRows={5}
                placeholder='Enter product description'
                value={productDescription}
                onChange={(e) => setproductDescription(e.target.value)}
                />
              <Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Overview</Form.Label>
                
              <TextareaAutosize
                type="textarea"
                minRows={5}
                placeholder='Enter product Overview'
                value={productOverview}
                onChange={(e) => setproductOverview(e.target.value)}
                />
             
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">
                 <Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Top Speed</Form.Label>
                
                <Form.Control
                  type="text"
                  placeholder='Enter Top Speed'
                  value={productTopSpeed}
                  onChange={(e) => setproductTopSpeed(e.target.value)}
                  />
                  </FormControl>
               
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">

                 <Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Ratings</Form.Label>
                
                <Form.Control
                  type="text"
                  placeholder='Enter product Overview'
                  value={productOverview}
                  onChange={(e) => setproductOverview(e.target.value)}
                  />
                    </FormControl>
                    
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 220 }} size="small">
                 <Form.Label htmlFor="inputPassword5" className='mt-3'>Select the Frame Size</Form.Label>
                 
              <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={productSize}
                  label="Branch"
                  onChange={handleCycleFrame}
              >
            <MenuItem value={'Frame Size One'}>Frame Size One</MenuItem>
            <MenuItem value={'Frame Size Two'}>Frame Size Two</MenuItem>
            <MenuItem value={'Frame Size Three'}>Frame Size Three</MenuItem>
            {/* <MenuItem value={'Brand Four'}>Brand Four</MenuItem>
            <MenuItem value={'Brand Five'}>Brand Five</MenuItem>
            <MenuItem value={'Brand Six'}>Brand Six</MenuItem> */}
     
</Select>                      
                  </FormControl>
                  <h4 style={{
                    marginTop:120
                  }}>
                    Features
                  </h4>
                 <FormControl style={{marginTop: "5px"}} sx={{ m: 1, minWidth: 220 }} size="small">

<Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Frames</Form.Label>

<Form.Control
 type="text"
 placeholder='Enter product Overview'
 value={productOverview}
 onChange={(e) => setproductOverview(e.target.value)}
 />
            </FormControl>
            

            <FormControl style={{marginTop: "5px"}} sx={{ m: 1, minWidth: 220 }} size="small">
<Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Drivetrain</Form.Label>
              
<Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={productCycleType}
    label="Branch"
    onChange={handleCycleType}
    placeholder="Select the Cycle Type"
>
            <MenuItem value={'Brand One'}>Brand One</MenuItem>
            <MenuItem value={'Brand Two'}>Brand Two</MenuItem>
            <MenuItem value={'Brand Three'}>Brand Three</MenuItem>
            <MenuItem value={'Brand Four'}>Brand Four</MenuItem>
            <MenuItem value={'Brand Five'}>Brand Five</MenuItem>
            <MenuItem value={'Brand Six'}>Brand Six</MenuItem>
     
</Select>
</FormControl>

            <FormControl style={{marginTop: "5px"}} sx={{ m: 1, minWidth: 220 }} size="small">
<Form.Label htmlFor="inputPassword5" className='mt-3'>Enter the Component</Form.Label>
              
<Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={productCycleType}
    label="Branch"
    onChange={handleCycleType}
    placeholder="Select the Component"
>
            <MenuItem value={'Component One'}>Component One</MenuItem>
            <MenuItem value={'Component Two'}>Component Two</MenuItem>
            <MenuItem value={'Component Three'}>Component Three</MenuItem>
            <MenuItem value={'Component Four'}>Component Four</MenuItem>
            <MenuItem value={'Component Five'}>Component Five</MenuItem>
            <MenuItem value={'Component Six'}>Component Six</MenuItem>
     
</Select>
</FormControl>

              
              
                <div style={{marginTop: "20px"}}>
                <p>Upload product images here</p>
                  
                  <div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Default file input example</label>
                    <input class="form-control" type="file" id="formFile" onChange={productImageHandle}/>
                  </div>
                      <Button variant="contained" onClick={uploadProductMain}>Upload</Button>
                  </div>

                </div>
                <div style={{marginTop: "20px"}}>
                <Form.Label htmlFor="exampleColorInput"></Form.Label>
                
                    <p>select theme</p>
                <Form.Control
                    style={{width: "10%"}}
                    type="color"
                    id="exampleColorInput"
                    defaultValue="#563d7c"
                    title="Choose your color"
                />
                </div>

                <Button variant="primary" className='mt-2'>Create Product</Button>

              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div>

              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </div>
    </div>
  )
}

export default Products