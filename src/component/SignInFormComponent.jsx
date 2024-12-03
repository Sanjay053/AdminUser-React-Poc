import '../App.css';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

function SignInFormComponent() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [showMessage, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  async function onSubmit(data) {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      })

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const result = await response.json()

      if (result && result.token) {
        // console.log(data.username)
        setIsSuccess(true);
        auth.login(data.username)
        setMessage('Login Successful')
        console.log('Login Successful',)
        navigate('/home', { replace: true });
      } else {
        setIsSuccess(false)
        setMessage('Invalid username or password');
        console.log('Invalid username or password')
      }
    }
    catch (error) {
      setIsSuccess(false)
      setMessage(error.message)
      console.log('Invalid username or password')

    }
  }

  return (
    <div className='main'>
      <div className='component'>
        <div className='signin'>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {showMessage && <p className={isSuccess ? 'success' : 'error'}>{showMessage}</p>}
            <div className='formcontrol'>
              <div>
                <input className='input' type='text' id='username' placeholder='Enter the username' {...register("username", { required: "Username is Required" })} />
              </div>
              {errors?.username && <p className='error'>{errors.username.message}</p>}
            </div>
            <div className='formcontrol'>
              <div>
                <input className='input' type='password' id='password' placeholder='Enter the Password' {...register("password", { required: "Password is required" })} />
              </div>
              {errors?.password && <p className='error'>{errors.password.message}</p>}
            </div>
            <div className='formcontrol'>
              <button className='button' type='submit'>Submit</button>
            </div>
          </form>
        </div>
        <p className='interpage'>Create new user <Link to='/signup'>SignUp</Link> </p>
      </div>
    </div>
  )
}

export default SignInFormComponent
