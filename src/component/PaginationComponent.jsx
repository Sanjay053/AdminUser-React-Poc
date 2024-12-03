import React, { memo } from "react";

const PaginationComponent = (props) => {
    const { paginationArray, isIndexShow, callParenthFunc } = props


    return (
        isIndexShow && paginationArray.length > 0 ?
            (<div className='pageIndex'>
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        {
                            paginationArray.length > 0 && paginationArray.map((page, index) => {
                                return (
                                    <li key={page}>

                                        <div onClick={() => callParenthFunc(page)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>) : null
    )
}

export default memo(PaginationComponent)