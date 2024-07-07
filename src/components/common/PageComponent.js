import React from 'react';
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
function PageComponent({ pdIndfoList, movePage, categoryNo, itemNo }) {

    return (
        <div className='m-6 flex justify-center'>
            {pdIndfoList.prev ?
                //<div className='m-2 p-2 w-16 text-center'
                <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    onClick={() => movePage({ page: pdIndfoList.prevPage, categoryNo: categoryNo, itemNo: itemNo })}>
                    <span className="sr-only">Previous</span>
                    <span className="sr-only">Previous</span>
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                </div> : <></>
            }

            {pdIndfoList.pageNumList.map(pageNum =>
                <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                                ${pdIndfoList.current === pageNum ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
                    key={pageNum}
                    //  onClick={() => pageList({page:pageNum,categoryNo:categoryNo,itemNo:itemNo})}>
                    onClick={() => { movePage({ page: pageNum, categoryNo: categoryNo, itemNo: itemNo }); }}>
                    {pageNum}
                </div>
            )}

            {pdIndfoList.next ?
                <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                    onClick={() => movePage({ page: pdIndfoList.nextPage, categoryNo: categoryNo, itemNo: itemNo })}>
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                </div> : <></>
            }
        </div>
    );
}






export default PageComponent;