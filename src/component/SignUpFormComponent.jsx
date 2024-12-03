import React, { useEffect, useState } from 'react';
import '../App.css'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function SignUpFormComponent() {
  const navigate = useNavigate()
  const [geolocation, setGeoLocation] = useState({ lat: '', long: '' });
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      name: {
        firstname: '',
        lastname: '',
      },
      address: {
        city: '',
        street: '',
        number: '',
        zipcode: '',
        geolocation: {
          lat: '',
          long: '',
        },
      },
      phone: '',
    },
  });

  // Handle geolocation
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ lat: latitude, long: longitude });
        setValue('address.geolocation.lat', latitude);
        setValue('address.geolocation.long', longitude);
      },
      (error) => {
        console.error('Geolocation error:', error.message);
      }
    );
  };

  useEffect(() => {
    handleLocation();
  });

  async function onSubmit(data) {
    try {
      const payload = {
        email: data.email,
        username: data.username,
        password: data.password,
        name: {
          firstname: data.name.firstname,
          lastname: data.name.lastname,
        },
        address: {
          city: data.address.city,
          street: data.address.street,
          number: data.address.number,
          zipcode: data.address.zipcode,
          geolocation: {
            lat: data.address.geolocation.lat,
            long: data.address.geolocation.long,
          },
        },
        phone: data.phone,
      };

      console.log("payload beign send", payload)

      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result) {
        console.log('Sign-Up Success:', result);
        navigate('/home')
      }

    } catch (error) {
      console.error('Sign-Up Error:', error.message);
    }
  }

  return (
    <div className='main'>
      <div className='component'>
        <div className="signup">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              className='input'
              type="email"
              placeholder="Enter Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter Username"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="error">{errors.username.message}</p>}

            <input
              className='input'
              type="password"
              placeholder="Enter Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter Firstname"
              {...register('name.firstname', { required: 'Firstname is required' })}
            />
            {errors.name?.firstname && <p className="error">{errors.name.firstname.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter Lastname"
              {...register('name.lastname', { required: 'Lastname is required' })}
            />
            {errors.name?.lastname && <p className="error">{errors.name.lastname.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter City"
              {...register('address.city', { required: 'City is required' })}
            />
            {errors.address?.city && <p className="error">{errors.address.city.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter Street"
              {...register('address.street', { required: 'Street is required' })}
            />
            {errors.address?.street && <p className="error">{errors.address.street.message}</p>}
            <input
              className='input'
              type="text"
              placeholder="Enter Number"
              {...register('address.number', { required: 'Number is required' })}
            />
            {errors.address?.number && <p className="error">{errors.address.number.message}</p>}

            <input
              className='input'
              type="text"
              placeholder="Enter Zipcode"
              {...register('address.zipcode', { required: 'Zipcode is required' })}
            />
            {errors.address?.zipcode && <p className="error">{errors.address.zipcode.message}</p>}

            <div>
              <div>
                <input
                  className='input'
                  type="text"
                  placeholder="Latitude"
                  {...register('address.geolocation.lat')}
                  value={geolocation.lat || ''}
                  readOnly
                />
              </div>
              <div>
                <input
                  className='input'
                  type="text"
                  placeholder="Longitude"
                  {...register('address.geolocation.long')}
                  value={geolocation.long || ''}
                  readOnly
                />
              </div>
            </div>

            <input
              className='input'
              type="text"
              placeholder="Enter Phone Number"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <button className='button' type="submit">Sign Up</button>
          </form>
          <p className='interpage'>already have account? <Link to="/">Sign In</Link></p>
        </div>
      </div >
    </div >

  );
}

export default SignUpFormComponent;
