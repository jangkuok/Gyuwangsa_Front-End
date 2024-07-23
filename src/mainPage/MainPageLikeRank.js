
//import { Swiper, SwiperSlide } from "swiper/react";
//import { A11y, Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from "swiper";

// <SwiperSlide>
//   <img className='h-96 w-full' src={`/public_assets/zara.jpg`} />
// </SwiperSlide>
// <SwiperSlide>
//   <img className='h-96 w-full' src={`/public_assets/woo.jpg`} />
// </SwiperSlide>
// <SwiperSlide>
//   <img className='h-96 w-full' src={`/public_assets/adidas.png`} />
// </SwiperSlide>

import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';

import { selectLikePdInfoRank, selectListByPdInfo } from '../api/pdInfoApi';
import { host } from '../components/pdInfo/PdInfoListComponent';
import { Link } from 'react-router-dom';

export default function MainPageLikeRank() {

  const [pdInfoList, setPdInfoList] = useState([])

  useEffect(() => {
    selectLikePdInfoRank().then((data) => {
      setPdInfoList(data)
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

  const productTemplate = (product) => {
    return (
      <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all ml-3" >
        <Link to={`/product/info/${product.pdNo}`} >
          <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
            <img src={`${host}/product/view/${product.imageList[0]}`} alt="Product 1"
              className="h-72 w-full object-cover object-top justify-center" />
          </div>
        </Link>
        <div className="p-2">
          <Link to={`/brand/${product.brandNo}`}>
            <p className="text-[#767676] text-[14px]">[{product.brandNm}]</p>
          </Link>
          <h3 className="text-[15px]font-bold text-gray-800">{product.pdName}</h3>
          <div className="flex items-center flex-wrap gap-2">
            <h4 className="text-[13px] font-bold text-gray-800">\{ }{product.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          </div>
          <div className='grid grid-cols-5'>
            <svg
              className="text-red-400 w-6 h-auto fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
            </svg>
            <p className="text-[#767676] text-[14px]">{product.likeCnt}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-300 pb-9">
        <h2 className="text-lg font-extrabold text-gray-800">Most Populer</h2>
        <p className="text-[#767676] text-[14px]  mb-5">인기 상품</p>
        <div className="card">
          <Carousel value={pdInfoList} numVisible={5} numScroll={4} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={3000} itemTemplate={productTemplate} />
        </div>
      </div>
    </div>
  )
}






