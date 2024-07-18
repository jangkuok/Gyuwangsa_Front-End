import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';

import { selectLikePdInfoRank, selectListByPdInfo } from '../api/pdInfoApi';
import { host } from '../components/pdInfo/PdInfoListComponent';
import { Link } from 'react-router-dom';
import { selectRandomBrandList } from '../api/brandApi';

export default function BrandListCarouel() {

    const [brandList, setBrandList] = useState([])

    useEffect(() => {
        selectRandomBrandList().then((data) => {
            setBrandList(data)
        })


    }, [])

    const responsiveOptions = [
        {
            breakpoint: '1536px',
            numVisible: 5,
            numScroll: 4
        },
        {
            breakpoint: '1280px',
            numVisible: 5,
            numScroll: 4
        },
        {
            breakpoint: '1024px',
            numVisible: 5,
            numScroll: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3,
            numScroll: 4
        },
        {
            breakpoint: '640px',
            numVisible: 2,
            numScroll: 4
        }
    ];

    const productTemplate = (brand) => {
        return (
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
        );
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 my-24">
            <div className="border-b border-gray-300 pb-12 ">
                <h2 className="text-lg font-extrabold text-gray-800">Suggest Brand</h2>
                <p className="text-[#767676] text-[14px]  mb-5">추천 브랜드</p>
                <div className="card">
                    <Carousel value={brandList} numVisible={7} numScroll={4} responsiveOptions={responsiveOptions} className="custom-carousel" circular itemTemplate={productTemplate} />
                </div>
            </div>
        </div>
    )
}


