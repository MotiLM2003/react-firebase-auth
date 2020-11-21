import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      try {
        await signUp(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('not match');
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4 '>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>password</Form.Label>
              <Form.Control type='password ' required ref={passwordRef} />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password COnfirmation</Form.Label>
              <Form.Control type='password' required ref={passwordConfirmRef} />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log in
      </div>
    </React.Fragment>
  );
};

export default Signup;
