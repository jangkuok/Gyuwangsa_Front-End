import React, { useEffect, useState } from 'react';
import { selectPdInfoByKeyword } from '../../api/pdInfoApi';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { insertPdLike, removePdLike } from '../../api/likeApi';
import PageComponent from '../common/PageComponent';
import { host } from './PdInfoListComponent';
import { Link } from 'react-router-dom';
import SearchPageComponet from '../common/SearchPageComponet';
import { selectBrandByKeyword, selectBrandList, selectListByBrandPdInfo } from '../../api/brandApi';
import PageMoveBrandComponent from '../brand/PageMoveBrandComponent';

const initStatePdInfo = {
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

const initStateBrand = {
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

const initStateBrandPdInfo = {
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

function PdInfoSearchListComponent({ keyword }) {

    const [pdInfoList, setPdInfoList] = useState(initStatePdInfo)
    const [brandList, setBrandList] = useState(initStateBrand)
    const [brandListPdInfo, setBrandListPdInfo] = useState(initStateBrandPdInfo)

    const [brandNo, setBrandNo] = useState(0)

    const { loginState } = UserCustomLogin()
    const userId = loginState.userId
    const [likeCnt, setLikeCnt] = useState(0)

    const [page, setPage] = useState(1)
    const size = 20

    useEffect(() => {

        if (brandList.totalCount !== 1) {
            //브랜드 키워드 리스트
            selectBrandByKeyword(keyword, page, size).then((data) => {
                setBrandList(data)
            })
        }
        //상품 키워드 리스트
        selectPdInfoByKeyword(keyword, page, size, userId).then((data) => {
            setPdInfoList(data)

        })

        if (likeCnt !== 0) {
            selectPdInfoByKeyword(keyword, page, size, userId).then((data) => {
                setPdInfoList(data)
            })
        }

        //브랜드 상품 리스트
        if (brandList.totalCount === 1 && brandList.dtoList.length !== 0) {
            selectBrandByKeyword(keyword, 1, size).then((data) => {
                setBrandList(data)
                setBrandNo(data.dtoList[0].brandNo)
            })
            selectListByBrandPdInfo(brandNo, page, size, userId).then((data) => {
                setBrandListPdInfo(data)
            })

            if (likeCnt !== 0) {
                selectListByBrandPdInfo(brandNo, page, size, userId).then((data) => {
                    setBrandListPdInfo(data)
                })
            }
        }
    }, [keyword, page, size, userId, likeCnt, brandList.totalCount, brandNo])

    const handleLikeButton = (pdNo) => {
        if (userId === '') {
            window.confirm('로그인이 필요합니다.')
            return
        }
        insertPdLike(userId, pdNo)
    }

    const handleLikeCancelButton = (pdNo) => {
        if (userId === '') {
            window.confirm('로그인이 필요합니다.')
            return
        }
        removePdLike(userId, pdNo)
    }

    console.log(brandList)
    return (
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
                {brandList.totalCount === 0 && pdInfoList.totalCount === 0 ?
                    <div>
                        <h2 className="mt-36 text-lg text-center font-extrabold text-gray-400 mb-10">검색하신 결과가 없습니다.  </h2>
                    </div>
                    : <></>
                }
                {brandList.totalCount !== 0 ?
                    <div className="border-b border-gray-300 pb-9">
                        <h2 className="text-lg font-extrabold text-gray-800">Brand({brandList.totalCount}개)</h2>
                        <p className="text-[#767676] text-[14px]  mb-5">브랜드</p>
                        {brandList.dtoList.map((brandInfo, i) => (
                            <Link key={i} to={`/brand/${brandInfo.brandNo}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6 border rounded-lg">
                                    <div className="flex flex-col justify-between ">
                                        <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                                            <div className="flex-1 p-6 undefined ">
                                                <div className="flex flex-col xl:flex-row items-center justify-between ">
                                                    <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:mb-0 ">
                                                        <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:mb-0">
                                                            <img className='h-24 w-24' src={`${host}/brand/view/${brandInfo.brandLog}`} />
                                                        </span>
                                                        <div className="text-center space-y-1 xl:text-left xl:mr-4">
                                                            <h4 className="text-xl font-semibold ">{brandInfo.engNm}</h4>
                                                            <p className="text-gray-500 dark:text-slate-400">
                                                                <b>{brandInfo.brandNm}</b>
                                                            </p>
                                                            <p className="text-gray-500 dark:text-slate-400">
                                                                <b>{brandInfo.note}</b>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    :
                    <></>
                }
                {brandList.totalCount === 1 ?
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-800 pt-9">Brand Product({brandListPdInfo.totalCount}개)</h2>
                        <p className="text-[#767676] text-[14px]  mb-5">브랜드 상품</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
                            {brandListPdInfo && brandListPdInfo.dtoList.map((pdInfo, i) => (
                                <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all" key={i} >
                                    <Link to={`/product/info/${pdInfo.pdNo}`} >
                                        <div
                                            className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                                            <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1" className="h-full w-full object-cover object-top" />
                                        </div>
                                    </Link>
                                    <div className="p-2">
                                        <Link to={`/brand/${pdInfo.brandNo}`}>
                                            <p className="text-[#767676] text-[14px]">[{pdInfo.brandNm}]</p>
                                        </Link>
                                        <h3 className="text-[15px] font-bold text-gray-800">{pdInfo.pdName}</h3>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h4 className="text-[13px] font-bold text-gray-800">\{ }{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>

                                            {loginState.roleNm !== 'BRAND_MANAGER' ?
                                                <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
                                                    {pdInfo.likeFlag === false ?
                                                        <svg
                                                            onClick={() => { handleLikeButton(pdInfo.pdNo); setLikeCnt(() => 1); }}
                                                            className="text-red-400 w-6 h-auto fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                                                        </svg>
                                                        :
                                                        <></>}
                                                    {pdInfo.likeFlag === true ?
                                                        <svg
                                                            onClick={() => { handleLikeCancelButton(pdInfo.pdNo); setLikeCnt(() => 2); }}
                                                            className="text-red-400 w-6 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                                                        </svg>
                                                        :
                                                        <></>}
                                                </div>
                                                :
                                                <></>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <SearchPageComponet pdInfoList={brandListPdInfo} setPage={setPage} />
                        </div>
                    </div>
                    :
                    <></>}

                {pdInfoList.totalCount !== 0 ?
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-600 mb-10">검색 상품({pdInfoList.totalCount}개)</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {pdInfoList.dtoList.map((pdInfo, i) => (
                                <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all" key={i}>
                                    <Link to={`/product/info/${pdInfo.pdNo}`}>
                                        <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                                            <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1"
                                                className="h-full w-full object-cover object-top" />
                                        </div>
                                    </Link>
                                    <div className="p-2">
                                        <p className="text-[#767676] text-[14px]">[{pdInfo.brandNm}]</p>
                                        <h3 className="text-lg font-bold text-gray-800 max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap ">{pdInfo.pdName}</h3>
                                        <div className="mt-4 flex items-center flex-wrap gap-2">
                                            <h4 className="text-lg font-bold text-gray-800">\{ }{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                                            {loginState.roleNm !== 'BRAND_MANAGER' ?
                                                <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
                                                    {pdInfo.likeFlag === false ?
                                                        <svg
                                                            onClick={() => { handleLikeButton(pdInfo.pdNo); setLikeCnt(() => 1) }}
                                                            className="text-red-400 w-6 h-auto fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                                                        </svg>
                                                        :
                                                        <></>}
                                                    {pdInfo.likeFlag === true ?
                                                        <svg
                                                            onClick={() => { handleLikeCancelButton(pdInfo.pdNo); setLikeCnt(() => 2) }}
                                                            className="text-red-400 w-6 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                                                        </svg>
                                                        :
                                                        <></>}
                                                </div>
                                                :
                                                <></>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <SearchPageComponet pdInfoList={pdInfoList} setPage={setPage} />
                        </div>
                    </div>
                    :
                    <></>}
            </div>

        </div >
    );
}

export default PdInfoSearchListComponent;