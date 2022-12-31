import React, { useState } from "react";
import "./register.css";
import MainScreen from "./../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import ErrorMessage from "./../../components/ErrorMessage";
import Loading from "./../../components/Loading";
import useForm from "../../hooks/useForm";
import axios from "axios";

const RegisterPage = () => {
  const [values, handleChange, resetForm] = useForm({
    email: "",
    name: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/register", values, {
        baseURL: "http://localhost:5000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log(values);
      setLoading(false);
      resetForm();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        <ErrorMessage variant="danger" errors={error} />
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Enter name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              name="confirmpassword"
              value={values.confirmpassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>upload profile picture</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            Register
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
