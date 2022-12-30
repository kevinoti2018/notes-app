import React,{useState,useEffect} from 'react'
import './register.css'
import MainScreen from './../../components/MainScreen';
import { Form ,Button} from 'react-bootstrap';
import axios from 'axios'
import ErrorMessage from './../../components/ErrorMessage';
import Loading from './../../components/Loading';
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const[error,setError] =useState(false)
    const[loading,setLoading] =useState(false)
    const submitHandler = async(e)=>{
        e.preventDefault()
        if(password !== confirmpassword){
            setMessage("passwords do not match")
        }else{
            setMessage(null)
            try{
                setLoading(true)
                const {data}= await axios.post("/api/users/",{name,pic,email,password}, {
                    baseURL: "http://localhost:5000",
                    headers: {
                      "Content-Type": "application/json",
                    }
                  });
                  setLoading(false)

                  localStorage.setItem("userInfo", JSON.stringify(data))
            }
            catch(err){
                setError(error.response.data.message)
            }
        }
        console.log(email);
    }
  return (
    <MainScreen title="Register">
        <div>
        {error &&  <ErrorMessage variant="danger" >{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger" >{message}</ErrorMessage>}
        {loading && <Loading/>}   
        <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter name</Form.Label>
                <Form.Control value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>
                 </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>confirm Password</Form.Label>
                <Form.Control type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)} />
                 </Form.Group>
                 <Form.Group controlId="formFile" className="mb-3">
                 <Form.Label>upload profile picture</Form.Label>
                 <Form.Control type="file"   />
               </Form.Group>

                 <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    </MainScreen>
  )
}

export default RegisterPage