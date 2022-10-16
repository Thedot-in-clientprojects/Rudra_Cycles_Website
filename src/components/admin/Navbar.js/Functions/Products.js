import React, { useState, useEffect }  from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Products() {

    const [category, setCategory] = useState('');


    const [product, setproduct] = useState('');
    const [productCategory, setproductCategory] = useState('');


  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  const submitCategory = (e) => {
    e.preventDefault();
    
  }
  return (
    <div>
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
                placeholder='Enter the Category'
            />
            <Button variant="primary" onClick={(e) => submitCategory(e)} className='mt-2'>Create</Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div>
              <Form.Control
                type="text"
                placeholder='Enter Product Name'
                />
                 <FormControl style={{marginTop: "25px"}} sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Category</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
                
              <Form.Control
                style={{marginTop: "20px"}}
                type="text"
                placeholder='Enter product description'
                />
              <Form.Control
                style={{marginTop: "20px"}}
                type="text"
                placeholder='Enter product Price'
                />
                <div style={{marginTop: "20px"}}>
                <p>Upload product images here</p>
                 <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => console.log('Files:', files)}
                />
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