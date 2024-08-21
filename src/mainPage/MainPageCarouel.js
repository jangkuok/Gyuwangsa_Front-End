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

export default function MainPageCarouel() {

  const image = [
    "/public_assets/advertising1.jpg",
    "/public_assets/advertising2.jpg",
    "/public_assets/advertising3.jpg",
    "/public_assets/advertising4.jpg",
    "/public_assets/advertising5.jpg",

  ]

  const responsiveOptions = [
    {
      breakpoint: '1536px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1021px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const productTemplate = (image) => {
    return (
      <div>
          <img className='sm:h-48 lg:h-96 xl:h-96 2xl:h-96 w-full' src={`${image}`} />
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-9xl px-1 py-4">
      <div className="card">
        <Carousel value={image} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
          autoplayInterval={8000} itemTemplate={productTemplate} />
      </div>
    </div>
  )
}






