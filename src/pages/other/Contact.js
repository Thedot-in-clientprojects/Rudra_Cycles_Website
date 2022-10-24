import PropTypes from "prop-types";
import React, { useState, useEffect, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import { Alert } from "@mui/material";
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
import { realDB } from '../../util/initFirebase';
import 'firebase/database'
import 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';


const Contact = ({ location }) => {
  const { pathname } = location;

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [enquery, setenquery] = useState('');

  const submitEnquery = (e) => {
    e.preventDefault();
    const id = uuidv4();

    const db = getDatabase();
      set(ref(db, `user/enquery/${id}`), {
        id: id,
        name: name,
        phone: email,
        enquery: enquery,
        status: 'New'
        
      }).then(res => {
        setname('')
        setemail('')
        setenquery('')
        setisSuccess(true)
      })

  }

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
  }, [isSuccess])
  

  return (
    <Fragment>
      <MetaTags>
        <title>Contact Us | Rudra Cycle Mart Coimbatore</title>
        <meta
          name="description"
          content="Contact us for your Enqueries or Feedbacks ."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {successAlert()}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="11.001950324065447" longitude=" 76.95111104723884" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+91 9496582996</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:yourname@email.com">
                          rudhracycles@gmail.com
                        </a>
                      </p>
                      <p>
                        <a href="https://yourwebsitename.com">
                          rudracyclemart.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>173A, Srinivasa Ragavan St, R.S. Puram,  </p>
                      <p>Coimbatore, Tamil Nadu 641002,</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" value={name} placeholder="Name*" type="text" onChange={(e) => setname(e.target.value)}/>
                      </div>
                      <div className="col-lg-6">
                        <input name="phone" value={email} placeholder="Phone*" type="number" onChange={(e) => setemail(e.target.value)}/>
                      </div>
                      {/* <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                        />
                      </div> */}
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          value={enquery}
                          placeholder="Your Message*"
                          defaultValue={""}
                          onChange={(e) => setenquery(e.target.value)}
                        />
                        <button className="submit" type="submit" onClick={submitEnquery}>
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
