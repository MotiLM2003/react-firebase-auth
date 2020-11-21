import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4 '>Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' required ref={passwordRef} />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Log in
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/forgot-password'>Forgot password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
