import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  Link,useNavigate} from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container >
        <Navbar.Brand >
        <Link to='/'>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
        <Nav className="m-auto">
            <Form inline>
            <Form.Control
            type="search"
            placeholder="Search"
            className="mr-sm-2"
            aria-label="Search"/> </Form>
        </Nav>
      
          <Nav
           
          >
            <Nav.Link href="/mynotes">My note</Nav.Link>
            <NavDropdown title="kevin" id="navbarScrollingDropdown">
              <NavDropdown.Item >
              <Link to='/mynotes'> My Notes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{localStorage.removeItem('userInfo')
            navigate('/')
            }} >
              <Link to='/mynotes'  >  Logout</Link>
                
              </NavDropdown.Item>
              
            </NavDropdown>
            
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header