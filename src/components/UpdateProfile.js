import React, { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      setError('passwords not match');
    }
    const promises = [];
    if (emailRef.current.value != currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.valuepassword) {
      promises.push(updatePassword(passwordRef.current.valuepassword));
    }

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          setTimeout(() => {
            console.log(currentUser.email);
            history.push('/');
          }, 2000);
        })
        .catch(() => {
          setError('Faild to update account');
        });
    } else {
      setError('Nothing to update');
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4 '>Profile Details</h2>
          <Form onSubmit={handleSubmit}>
            {error ? <Alert variant='danger'>{error}</Alert> : ''}
            {message ? <Alert variant='success'>{message}</Alert> : ''}
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>password</Form.Label>
              <Form.Control
                type='password '
                ref={passwordRef}
                placeholder='Leave black to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                placeholder='Leave black to keep the same'
              />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Update profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </React.Fragment>
  );
};

export default UpdateProfile;
