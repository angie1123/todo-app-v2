//only display todo after login

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = (event) => {
    event.preventDefault()
    if (username && password) {
      setUser({ "username": username, "password": password })
      if (user) {
        navigate('/')
      }
    }
     else {
      return(<Navigate to="/login" replace/>)
    }
  }
  
  return (
  
    <Container className="mt-5">
      <h1 className="my-5">Login to your account</h1>
      <Form onSubmit={handleLogin}>
      <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col md="10">
          <Form.Control
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text" placeholder="username" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col md="10">
          <Form.Control
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <Button type="submit">Login</Button>
      </Form>
      </Container>
    
  )
}