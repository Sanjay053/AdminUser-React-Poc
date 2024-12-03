import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/Auth'

export const useServiceHandlers = () => {
    const navigate = useNavigate();
    const auth = useAuth()


    const handleEdit = (id) => {
        console.log("User ID: ", id);
        navigate(`/update/${id}`);
    };

    const handleLogout = () => {
        auth.logout()
        navigate('/', { replace: true });
    }

    const handleSorting = async (e, setUserData) => {
        console.log(e.target.value)
        const sortType = e.target.value
        const response = await fetch(`https://fakestoreapi.com/users?sort=${sortType}`)

        const data = await response.json()
        setUserData(data)
    }

    const handleDelete = async (item, index, setUserData, userData) => {
        const response = await fetch(`https://fakestoreapi.com/users/${item.id}`, {
            method: "DELETE"
        })

        const deluser = await response.json()
        console.log("del", deluser)

        const userId = userData.map(user => user.id)
        console.log('userId', userId[index], 'delteuserid', deluser.id)

        if (userId[index] === deluser.id) {
            console.log('Same id')
            setUserData(
                userData.filter(item => item.id !== deluser.id)
            )
        } else {
            console.log('not same')
        }
    }

    return { handleEdit, handleLogout, handleSorting, handleDelete };
};



// import React, { memo } from "react";

// const PaginationComponent = (props) => {
//     const { pageIndex, paginationArray, showDataByPage } = props
//     console.log(pageIndex, paginationArray)
//     return (
//         pageIndex === 0 && paginationArray.length > 0 ?
//             (<div className='p-5'>
//                 <nav aria-label="Page navigation example">
//                     <ul className="inline-flex -space-x-px text-sm">
//                         {
//                             paginationArray.length > 0 && paginationArray.map((page, index) => {
//                                 console.log("page index", pageIndex)
//                                 return (
//                                     <li key={page}>
//                                         <div onClick={showDataByPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</div>
//                                     </li>
//                                 )
//                             })
//                         }

//                         {/* <li>
//                                             <div onClick={() => setPageIndex(1)} href='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</div>
//                                         </li> */}
//                     </ul>
//                 </nav>
//             </div>) : null
//     )
// }

// export default memo(PaginationComponent)