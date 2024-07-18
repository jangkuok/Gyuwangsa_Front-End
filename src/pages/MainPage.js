import React, { useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import MainPageCarouel from '../mainPage/MainPageCarouel';
import MainPageLikeRank from '../mainPage/MainPageLikeRank';
import BrandListCarouel from '../mainPage/BrandListCarouel';
import RandomPdList from '../mainPage/RandomPdList';

function MainPage(props) {
    return (
        <BasicLayout>
            <MainPageCarouel />
            <MainPageLikeRank />
            <BrandListCarouel />
            <div>
                <img className='h-96 w-full' src={"/public_assets/advertising6.jpg"} />
            </div>
            <RandomPdList />
        </BasicLayout>
    );
}

export default MainPage;  