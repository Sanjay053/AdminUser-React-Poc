import React, { useState, useEffect, memo } from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateComponent() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [spinner, setSpinner] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    useEffect(() => {
        async function getUserDetails() {
            setSpinner(true)
            try {
                const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setSpinner(false)
                const data = await response.json();
                setUserData(data);
                reset(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        getUserDetails();
    }, [userId, reset]);

    const onSubmit = async (data) => {
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

            const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            localStorage.setItem('userDetail', JSON.stringify(result))

            console.log('Update Success:', result);
            navigate('/home')
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main'>
            <div className='component'>
                <h2>Update User</h2>
                {
                    spinner ? <p>Loading...</p> : null
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Username"
                        {...register('username')}
                        readOnly
                    />
                    <input
                        className='input'
                        type="email"
                        placeholder="Enter Email"
                        {...register('email')}
                        readOnly
                    />
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter First Name"
                        {...register('name.firstname', { required: 'First Name is required' })}
                    />
                    {errors.name?.firstname && (
                        <p className="error">{errors.name.firstname.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Last Name"
                        {...register('name.lastname', { required: 'Last Name is required' })}
                    />
                    {errors.name?.lastname && (
                        <p className="error">{errors.name.lastname.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter City"
                        {...register('address.city', { required: 'City is required' })}
                    />
                    {errors.address?.city && (
                        <p className="error">{errors.address.city.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Street"
                        {...register('address.street', { required: 'Street is required' })}
                    />
                    {errors.address?.street && (
                        <p className="error">{errors.address.street.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Number"
                        {...register('address.number', { required: 'Number is required' })}
                    />
                    {errors.address?.number && (
                        <p className="error">{errors.address.number.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Zip Code"
                        {...register('address.zipcode', { required: 'Zip Code is required' })}
                    />
                    {errors.address?.zipcode && (
                        <p className="error">{errors.address.zipcode.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Latitude"
                        {...register('address.geolocation.lat', { required: 'Latitude is required' })}
                    />
                    {errors.address?.geolocation?.lat && (
                        <p className="error">{errors.address.geolocation.lat.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Longitude"
                        {...register('address.geolocation.long', { required: 'Longitude is required' })}
                    />
                    {errors.address?.geolocation?.long && (
                        <p className="error">{errors.address.geolocation.long.message}</p>
                    )}
                    <input
                        className='input'
                        type="text"
                        placeholder="Enter Phone Number"
                        {...register('phone', { required: 'Phone Number is required' })}
                    />
                    {errors.phone && <p className="error">{errors.phone.message}</p>}

                    <button className='button' type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default memo(UpdateComponent);
