import React, { useState, useEffect, memo, useCallback, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { useAuth } from './Auth'
import { useServiceHandlers } from '../services/serviceHandlers'
// import PaginationComponent from './PaginationComponent'
const PaginationComponent = lazy(() => import('./PaginationComponent'))

function HomeComponent() {
    const navigate = useNavigate()
    const auth = useAuth()
    const [userData, setUserData] = useState([])
    const { handleEdit, handleLogout, handleSorting, handleDelete } = useServiceHandlers()
    const pageLimit = 5;
    const [pageIndex, setPageIndex] = useState(1);
    const [paginationData, setPaginationData] = useState([])
    const paginationArray = Array(userData.length / pageLimit).fill().map((_, i) => i + 1);
    const [isIndexShow, setIndexShow] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/users');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
                setPaginationData(data.slice(0, 5))
                setIndexShow(!isIndexShow)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const getDetail = JSON.parse(localStorage.getItem('userDetail'))
        localStorage.removeItem('userDetail')

        if (getDetail) {
            fetchData().then(() => updateUserDetails(getDetail));
        } else {
            fetchData();
        }

        if (!auth.user) {
            navigate('/', { replace: true });
        }
    }, [auth.user, navigate]);


    const updateUserDetails = (data) => {
        setPaginationData(prevUserData => {
            console.log('Previous state before update:', prevUserData);

            const updatedUserData = prevUserData.map(user => {
                console.log('Comparing user:', user, 'with data:', data);

                if (user.email === data.email) {
                    return { ...user, ...data };
                }
                return user;
            });

            console.log('Updated User Data:', updatedUserData);
            return updatedUserData;
        });
    };



    const handlePageIndex = ((pageValue) => {
        if (pageValue === 5) {
            setIndexShow(!isIndexShow)
            setPaginationData(userData.slice(0, 5))
        } else {
            setIndexShow(!isIndexShow)
            setPaginationData(userData)
        }
    })

    const handleUserWithPagination = useCallback(() => {

        if (pageIndex === 1) {
            setPaginationData(userData.slice(0, 5))
        } else if (pageIndex === 2) {
            setPaginationData(userData.slice(5, 10))
        } else {
            setPaginationData(userData)
        }
    }, [userData, pageIndex])
    useEffect(() => {
        handleUserWithPagination()
    }, [handleUserWithPagination, pageIndex])


    const getTheValuefromParent = (value) => {
        setPageIndex(value)
        //handleUserWithPagination()
    }
    return (
        <div className='home'>
            <div className='navbar'>
                <div className='user-profile'>
                    <img src='Asset/profile-img.png' alt='profile-img' id='profile' className='profile-img' />
                    <h1>{auth.user}</h1>
                </div>
                <button className='logout' onClick={() => handleLogout()}>Logout</button>
            </div>

            <div className="custom-select py-4">
                {/* Sorting */}
                <select onChange={(e) => handleSorting(e, setPaginationData)}>
                    <option value="acen" key="1">Ascending</option>
                    <option value="desc" key="2">Descending</option>
                </select>
                {/* Item Limit */}

                <select defaultValue={'5'} onChange={(e) => handlePageIndex(parseInt(e.target.value))}>
                    {
                        paginationArray.map((limit) => (
                            <option value={limit * pageLimit} key={limit}>{pageLimit * limit}</option>
                        ))
                    }
                </select>
            </div>
            <div className='user-table'>
                {paginationData.length > 0 ?
                    (<div className='py-3'>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            textAlign: 'left',
                            border: '1px solid #ddd',
                        }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Phonenumber</th>
                                    <th>Firstname</th>
                                    <th>LastName</th>
                                    <th>City</th>
                                    <th>street</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginationData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.name.firstname}</td>
                                                <td>{item.name.lastname}</td>
                                                <td>{item.address.city}</td>
                                                <td>{item.address.street}</td>
                                                <td>
                                                    <button className='button' onClick={() => handleEdit(item.id)}>Edit</button>
                                                    <button className='button' onClick={() => handleDelete(item, index, setPaginationData, paginationData)}>Delete</button>
                                                </td>
                                            </tr>)
                                    }
                                    )
                                }
                            </tbody>
                        </table>

                    </div>)
                    : (<div>Loading...</div>)}

            </div>
            {
                <PaginationComponent isIndexShow={isIndexShow} setPageIndex={setPageIndex} paginationArray={paginationArray} callParenthFunc={getTheValuefromParent} />
            }
            {/* <PaginationComponent pageIndex={pageIndex}
                paginationArray={paginationArray} showDataByPage={handleShowDataByPage} /> */}
        </div>
    )
}

export default memo(HomeComponent)
