import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Customers() {




  return (
    <div>
        <h2 style={{
            marginLeft:25,
            marginTop:25
        }}>
            Customers
        </h2>
        <div className='container'>
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

            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <div>

            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <div>

            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
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