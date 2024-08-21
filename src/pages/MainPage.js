import React, { useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import MainPageCarouel from '../mainPage/MainPageCarouel';
import MainPageLikeRank from '../mainPage/MainPageLikeRank';
import BrandListCarouel from '../mainPage/BrandListCarouel';
import RandomPdList from '../mainPage/RandomPdList';
import CategoryItemInsert from '../components/CategoryItemInsert';

function MainPage(props) {
    return (
        <BasicLayout>
            {/* <CategoryItemInsert/> */}
            <MainPageCarouel />
            <MainPageLikeRank />
            <BrandListCarouel />
            <div>
                <img className='sm:h-48 lg:h-96 xl:h-96 2xl:h-96 w-full' src={"/public_assets/advertising6.jpg"} />
            </div>
            <RandomPdList />
        </BasicLayout>
    );
}

export default MainPage;  