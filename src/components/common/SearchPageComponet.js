import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

function SearchPageComponet({pdInfoList,setPage}) {
    return (
        <div className='m-6 flex justify-center'>
            {pdInfoList.prev ?
                <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    onClick={() => { setPage(() => pdInfoList.prevPage); }}>
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                </div> : <></>
            }

            {pdInfoList.pageNumList.map(pageNum =>
                <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                                ${pdInfoList.current === pageNum ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                    key={pageNum}
                    onClick={() => { setPage(() => pageNum); }}>
                    {pageNum}
                </div>
            )}

            {pdInfoList.next ?
                <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                    onClick={() => { setPage(() => pdInfoList.nextPage); }}>
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                </div> : <></>
            }
        </div>

    );
}

export default SearchPageComponet;