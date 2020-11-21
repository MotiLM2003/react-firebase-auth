import React, { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('There is not record in here');
    }
  };
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4 '>Password Reset</h2>
          <Form onSubmit={handleSubmit}>
            {message && <Alert variant='success'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Reset password
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </React.Fragment>
  );
};
export default ForgotPassword;
