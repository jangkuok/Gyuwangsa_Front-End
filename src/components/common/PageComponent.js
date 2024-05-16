import React from 'react';
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function PageComponent({pdIndfoList,movePage}) {
    return (
        <div className='m-6 flex justify-center'>
            {pdIndfoList.prev ?
                <div className='m-2 p-2 w-16 text-center'
                     onClick={() => movePage({page:pdIndfoList.prevPage})}>
                     Prev </div> : <></>          
            }

            {pdIndfoList.pageNumList.map(pageNum => 
                <div className={`m-2 p-2 w-16 text-center ${pdIndfoList.current === pageNum ?'bg-gray-500':'bg-blue-400'} cursor-pointer`}
                     key={pageNum}
                     onClick={() => movePage({page:pageNum})}>
                     {pageNum}   
                </div> 
            )}

            {pdIndfoList.next ?
                <div className='m-2 p-2 w-16 text-center' 
                     onClick={() => movePage({page:pdIndfoList.nextPage})}>
                     Next </div> : <></>          
            }
        </div>
    
        // <ButtonGroup variant="outlined">
        //     <IconButton onClick={() => movePage({page:pdIndfoList.prevPage})}>
        //         <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        //     </IconButton>
        //         {pdIndfoList.pageNumList.map(pageNum => 
        //             <IconButton key={pageNum}
        //                         onClick={() => movePage({page:pageNum})}>
        //                {pageNum}
        //             </IconButton>
        //         )}
        //     <IconButton onClick={() => movePage({page:pdIndfoList.nextPage})}>
        //         <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        //     </IconButton>
        // </ButtonGroup>

    );
}






export default PageComponent;