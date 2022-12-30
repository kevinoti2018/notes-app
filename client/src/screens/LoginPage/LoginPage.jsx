import React,{useState} from 'react'
import MainScreen from './../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import "./login.css"
import Loading from './../../components/Loading';

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const submitHandler = async(e)=>{
        e.preventDefault()
        try{
            const config={
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true)
        const {data }= await axios.post('/api/users/login',{
            email,
            password
        },
        config);
        console.log(data);
        localStorage.setItem('userInfo',JSON.stringify(data))

            setLoading(false)
        }
        

        catch(err){
            setError(error.response.data.message)
        }
    }
  return (
    <MainScreen title="LOGIN"> 
        <div className="loginContainer">
        {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
                 <Form.Control
                  type="password" 
                  placeholder="Password" 
                  value={password}
                onChange={(e)=> setPassword(e.target.value)}
                  />
            </Form.Group>
            <Button variant="primary" type="submit">
            Login
          </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer ? <Link to='/register'> Register Here </Link>
                </Col>
            </Row>
        </div>
    </MainScreen>
  )
}

export default LoginPage