import React, { useState } from "react";
import MainScreen from "./../../components/MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./login.css";
import Loading from "./../../components/Loading";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
  const [values, handleChange, resetForm] = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", values, {
        baseURL: "http://localhost:5000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log(response.data);
      setLoading(false);
      resetForm();
    } catch (err) {
      console.log(err);
      setError(err.error);
      setLoading(false);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {loading && <Loading />}
        {error && <div>{error}</div>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register"> Register Here </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
