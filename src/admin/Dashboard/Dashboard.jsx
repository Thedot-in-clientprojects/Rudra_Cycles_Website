import React from 'react'
import Navbarbox from '../../components/admin/Navbar.js/Navbar'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Products from '../../components/admin/Navbar.js/Functions/Products';
import Customers from '../../components/admin/Navbar.js/Functions/Customers';
import Blogs from '../../components/admin/Navbar.js/Functions/Blogs';
import Contacts from '../../components/admin/Navbar.js/Functions/Contacts';

function Dashboard() {
  return (
    <div>
        <Navbarbox/>
        <Tabs
      defaultActiveKey="product"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="product" title="Products">
        <div>
            <Products/>
        </div>
      </Tab>
      <Tab eventKey="customer" title="Customers">
        <div>
            <Customers/>
        </div>
      </Tab>
      <Tab eventKey="blog" title="Blogs">
        <div>
            <Blogs/>
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <div>
            <Contacts/>
        </div>
      </Tab>
    </Tabs>
    </div>
  )
}

export default Dashboard