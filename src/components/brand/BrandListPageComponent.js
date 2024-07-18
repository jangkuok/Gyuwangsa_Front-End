import React, { useEffect, useState } from 'react';
import { selectBrandList } from '../../api/brandApi';
import { host } from '../pdInfo/PdInfoListComponent';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

function BrandListPageComponent(props) {

    const [brandList, setBrandList] = useState(initState)
    const [page, setPage] = useState(1)
    const size = 20

    useEffect(() => {
        selectBrandList(page, size).then((data) => {
            setBrandList(data)
        })
    }, [page, size])


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-lg font-extrabold text-gray-800">Brand({brandList.totalCount}개)</h2>
            <p className="text-[#767676] text-[14px]  mb-14">브랜드</p>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                    {brandList.dtoList.map((brand, i) => (
                        <Link to={`/brand/${brand.brandNo}`}>
                            <div className="aspect-h-1 aspect-w-1 w-32 overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 ">
                                <img
                                    src={`${host}/brand/view/${brand.brandLog}`}
                                    className="h-32 w-32"
                                />

                                <h3 className="mt-4 font-bold  text-sm text-center text-gray-700">{brand.engNm}</h3>
                                <p className="mt-1 text-xs text-center font-medium text-gray-900">{brand.brandNm}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='m-6 flex justify-center'>
                {brandList.prev ?
                    <div className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        onClick={() => { setPage(() => brandList.prevPage); }}>
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                    </div> : <></>
                }

                {brandList.pageNumList.map(pageNum =>
                    <div className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset ring-black ml-0.5
                                ${brandList.current === pageNum ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                        key={pageNum}
                        onClick={() => { setPage(() => pageNum); }}>
                        {pageNum}
                    </div>
                )}

                {brandList.next ?
                    <div className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-0.5'
                        onClick={() => { setPage(() => brandList.nextPage); }}>
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                    </div> : <></>
                }
            </div>
        </div>
    );
}

export default BrandListPageComponent;