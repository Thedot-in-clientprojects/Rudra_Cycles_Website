import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Customers() {

  
  const [getAllEnuqueries, setgetAllEnuqueries] = useState([]);
  const getAllEnqueries = () => {
    const db = getDatabase();
    const enqueries = ref(db, 'user/query');
    onValue(enqueries, (snapshot) => {
        const data = snapshot.val();
        setgetAllEnuqueries(data);
        console.log(data)
      });
  }

  useEffect(() => {
      getAllEnqueries()
  }, [])
  

  const [isSuccess, setisSuccess] = useState(false);
  const enqueryToProcess = (e, enq) => {
    e.preventDefault(); 
    console.log('enq -> ',enq.id);
    
    const db = getDatabase();
    set(ref(db, `user/query/${enq.id}`), {
      id: enq.id,
      name: enq.name,
      phone: enq.phone,
      status: 'Process'
    }).then(res => {
      setisSuccess(true)
    })

  }

  const backToNew = (e, enq) => {
    e.preventDefault();
    
    const db = getDatabase();
    set(ref(db, `user/query/${enq.id}`), {
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
    set(ref(db, `user/query/${enq.id}`), {
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
    set(ref(db, `user/query/${enq.id}`), {
      id: enq.id,
      name: enq.name,
      phone: enq.phone,
      status: 'Done'
    }).then(res => {
      setisSuccess(true)
    })
  }


  const enqueryToDelete = (e, enq) => {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, `user/query/${enq.id}`), {
 
    }).then(res => {
      setisSuccess(true)
    })
  }


  const enqueryToNew = (e, enq) => {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, `user/query/${enq.id}`), {
      id: enq.id,
      name: enq.name,
      phone: enq.phone,
      status: 'New'
    }).then(res => {
      setisSuccess(true)
    })
  }

  const enqueryToRemove = (e, enq) => {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, `user/query/${enq.id}`), {
    
    }).then(res => {
      setisSuccess(true)
    })
  }


  return (
    <div>
        <h2 style={{
            marginLeft:25,
            marginTop:25
        }}>
            Customers
        </h2>
        <div className='container' style={{
          backgroundColor:'#E2E2E2'
        }}>
              <p>
                All WhatsApp Enquery
              </p>
              <div>
              <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <h5>
              All New Enquries
            </h5>
            <div>
              {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
                if(en[1].status === 'New')
                return(
                  <CardContent key={index} style={{
                    backgroundColor:'#92FF9D',
                    marginBottom:8
                  }}>
                    {
                      console.log('en -> ', en)
                    }
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
      <Button onClick={(e) => enqueryToProcess(e,en[1])} variant="outlined" size="small">
        On-Process    
      </Button>
      <Button onClick={(e) => enqueryToDone(e,en[1])} variant="outlined" size="small">
        To-Done    
      </Button>
      
    </CardContent>
                )
              })
              }
            </div>
            <div>

            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <div>
<h5>
              All OnProcess Enquries
            </h5>
            <div>
              {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
                if(en[1].status === 'Process')
                return(
                  <CardContent key={index} style={{
                    backgroundColor:'#92FF9D',
                    marginBottom:8
                  }}>
                    {
                      console.log('en -> ', en)
                    }
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
      <Button onClick={(e) => enqueryToNew(e,en[1])} variant="outlined" size="small">
        Back To New   
      </Button>
      <Button onClick={(e) => enqueryToDone(e,en[1])} variant="outlined" size="small">
        To-Done    
      </Button>
      
    </CardContent>
                )
              })
              }
            </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
          <h5>
              All Done Enquries
            </h5>
            <div>
              {getAllEnuqueries && Object.entries(getAllEnuqueries).map((en, index) => {
                if(en[1].status === 'Done')
                return(
                  <CardContent key={index} style={{
                    backgroundColor:'#92FF9D',
                    marginBottom:8
                  }}>
                    {
                      console.log('en -> ', en)
                    }
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
      <Button onClick={(e) => enqueryToProcess(e,en[1])} variant="outlined" size="small">
        On-Process    
      </Button>
      <Button onClick={(e) => enqueryToRemove(e,en[1])} variant="outlined" size="small">
          Deal Done
      </Button>
      
    </CardContent>
                )
              })
              }
            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <h5>
              All Holded Deals
            </h5>
            <div>

            </div>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
              </div>
        </div>
    </div>
  )
}

export default Customers