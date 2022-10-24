import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from 'react-bootstrap/Alert';
import { Paper } from '@mui/material';
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

function Contacts() {


    const [allContact, setallContact] = useState([]);



    const successAlert = () => {
      if(isSuccess)
      return(
        <Alert key={'success'} variant={'success'}>
          Your Changes is Done
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
    }, [isSuccess])
    
  
   
    const [getAllEnuqueries, setgetAllEnuqueries] = useState([]);
    const getAllEnqueries = () => {
      const db = getDatabase();
      const enqueries = ref(db, 'user/enquery');
      onValue(enqueries, (snapshot) => {
          const data = snapshot.val();
          setgetAllEnuqueries(data);
        });
    }

    useEffect(() => {
      getAllEnqueries()
   
    }, [])
    

    const enqueryToProcess = (e, enq) => {
      e.preventDefault();
      
      const db = getDatabase();
      set(ref(db, `user/enquery/${enq.id}`), {
        id: enq.id,
        name: enq.name,
        phone: enq.phone,
        enquery: enq.enquery, 
        status: 'Process'
      }).then(res => {
        setisSuccess(true)
      })

    }

    const backToNew = (e, enq) => {
      e.preventDefault();
      
      const db = getDatabase();
      set(ref(db, `user/enquery/${enq.id}`), {
        id: enq.id,
        name: enq.name,
        phone: enq.phone,
        enquery: enq.enquery, 
        status: 'New'
      }).then(res => {
        setisSuccess(true)
      })
    }

    const backToProcess = (e, enq) => {
      e.preventDefault();
      
      const db = getDatabase();
      set(ref(db, `user/enquery/${enq.id}`), {
        id: enq.id,
        name: enq.name,
        phone: enq.phone,
        enquery: enq.enquery, 
        status: 'Process'
      }).then(res => {
        setisSuccess(true)
      })
    }

    const enqueryToDone = (e, enq) => {
      e.preventDefault();
      const db = getDatabase();
      set(ref(db, `user/enquery/${enq.id}`), {
        id: enq.id,
        name: enq.name,
        phone: enq.phone,
        enquery: enq.enquery, 
        status: 'Done'
      }).then(res => {
        setisSuccess(true)
      })
    }


    const enqueryToDelete = (e, enq) => {
      e.preventDefault();
      const db = getDatabase();
      set(ref(db, `user/enquery/${enq.id}`), {
   
      }).then(res => {
        setisSuccess(true)
      })
    }

  return (
    <div>
        <h2 style={{
          marginTop:25,
          marginLeft:25
        }}>
        Contacts
        </h2>
        <div className='container'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="new">
      <Row>
        {successAlert()}
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="new">New Enquery</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="process">On Process</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="done">Done Enquery</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="new">
                  

                  <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
            if(en[1].status === 'New')
            return(
              <Grid key={index} item>
              <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name {en[1].name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Phone {en[1].phone}
      </Typography>
      {/* <Typography variant="h5" component="div">
        Phone
      </Typography> */}
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Enqueries
      </Typography>
      <Typography variant="body2">
          {en[1].enquery}
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
      <div>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => enqueryToProcess(e, en[1])}>On Process / Talking</Button>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => enqueryToDone(e, en[1])}>Done / Converted</Button>
      {/* <Button variant="contained">Contained</Button> */}
      </div>
            </Grid>
            )
          })
          }
        
        </Grid>
      </Grid>

      </Grid>
                  


            </Tab.Pane>
        </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="process">
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
            if(en[1].status === 'Process')
            return(
              <Grid key={index} item>
              <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name {en[1].name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Phone {en[1].phone}
      </Typography>
      {/* <Typography variant="h5" component="div">
        Phone
      </Typography> */}
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Enqueries
      </Typography>
      <Typography variant="body2">
          {en[1].enquery}
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
      <div>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => backToNew(e, en[1])}>Back to New</Button>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => enqueryToDone(e, en[1])}>Done / Converted</Button>
      {/* <Button variant="contained">Contained</Button> */}
      </div>
            </Grid>
            )
          })
          }
        
        </Grid>
      </Grid>

      </Grid>
            </Tab.Pane>
        </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="done">
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
            if(en[1].status === 'Done')
            return(
              <Grid key={index} item>
              <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name {en[1].name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Phone {en[1].phone}
      </Typography>
      {/* <Typography variant="h5" component="div">
        Phone
      </Typography> */}
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Enqueries
      </Typography>
      <Typography variant="body2">
          {en[1].enquery}
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
      <div>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => backToNew(e, en[1])}>Back to New</Button>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => backToProcess(e, en[1])}>Back to Process</Button>
      <Button variant="contained" style={{ marginRight:15 }} onClick={(e) => enqueryToDelete(e, en[1])}>Done / Converted</Button>
      {/* <Button variant="contained">Contained</Button> */}
      </div>
            </Grid>
            )
          })
          }
        
        </Grid>
      </Grid>

      </Grid>
            </Tab.Pane>
        </Tab.Content>
        </Col>
        </Row>
        </Tab.Container>
        
        </div>
    </div>
  )
}

export default Contacts