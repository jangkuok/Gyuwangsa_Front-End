import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

function PageMoveBrandComponent({ setPage, brandListPdInfo, categoryNumber, itemNumber }) {
    return (
        // 전체 상품
        <div>
            {
                categoryNumber === 0 && itemNumber === 0 ?
                    <div className='m-6 flex justify-center'>
                        {brandListPdInfo.prev ?
                            //<div className='m-2 p-2 w-16 text-center'
                            <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                onClick={() => { setPage(() => brandListPdInfo.prevPage) }}>
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }

                        {brandListPdInfo.pageNumList.map(pageNum =>
                            <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                             focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                            ${brandListPdInfo.current === pageNum ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                                key={pageNum}
                                onClick={() => { setPage(() => pageNum) }}>
                                {pageNum}
                            </div>
                        )}

                        {brandListPdInfo.next ?
                            <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                                onClick={() => { setPage(() => brandListPdInfo.nextPage) }}>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }
                    </div>
                    : <></>
            }

            {/* 카테고리 상품 */}

            {
                categoryNumber !== 0 && itemNumber === 0 ?
                    <div className='m-6 flex justify-center'>
                        {brandListPdInfo.prev ?
                            //<div className='m-2 p-2 w-16 text-center'
                            <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                onClick={() => { setPage(() => brandListPdInfo.prevPage) }}>
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }

                        {brandListPdInfo.pageNumList.map(pageNum =>
                            <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                     focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                    ${brandListPdInfo.current === pageNum ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                                key={pageNum}
                                onClick={() => { setPage(() => pageNum) }}>
                                {pageNum}
                            </div>
                        )}

                        {brandListPdInfo.next ?
                            <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                                onClick={() => { setPage(() => brandListPdInfo.nextPage) }}>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }
                    </div>
                    : <></>
            }


            {
                categoryNumber !== 0 && itemNumber !== 0 ?
                    <div className='m-6 flex justify-center'>
                        {brandListPdInfo.prev ?
                            //<div className='m-2 p-2 w-16 text-center'
                            <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                onClick={() => { setPage(() => brandListPdInfo.prevPage) }}>
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }

                        {brandListPdInfo.pageNumList.map(pageNum =>
                            <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                     focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                    ${brandListPdInfo.current === pageNum ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                                key={pageNum}
                                //onClick={() => { handleMovePage({ page: pageNum}); }}>
                                onClick={() => { setPage(() => pageNum) }}>
                                {pageNum}
                            </div>
                        )}

                        {brandListPdInfo.next ?
                            <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                                onClick={() => { setPage(() => brandListPdInfo.nextPage) }}>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </div> : <></>
                        }
                    </div>
                    : <></>
            }

        </div>



    );
}

export default PageMoveBrandComponent;
