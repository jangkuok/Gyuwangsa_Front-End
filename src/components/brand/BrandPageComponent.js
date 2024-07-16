import React, { useEffect, useState } from 'react';
import { selectBrandNo, selectListByBrandCategory, selectListByBrandCategoryItem, selectListByBrandPdInfo } from '../../api/brandApi';
import { host } from '../pdInfo/PdInfoByIdComponent';
import { Link, useNavigate, } from 'react-router-dom';
import { selectCategory, selectListBrandItem, } from '../../api/categoryApi';
import PageMoveBrandComponent from './PageMoveBrandComponent';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { insertPdLike, removePdLike } from '../../api/likeApi';


const initState = {
    brandNo: '',
    brandNm: '',
    engNm: '',
    brandLog: '',
    brandMainImage: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    mCall: '',
    comEmail: '',
    deliComp: '',
    stateCd: '',
    startDate: '',
    endDate: '',
    note: '',
}

const initStateCategory = {
    cartegoryNo: 0,
    cartegoryNm: ''
}

const initStateList = {
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

function BrandPageComponent({ brandNo }) {

    const [brandInfo, setBrandInfo] = useState(initState)
    const [brandListPdInfo, setBrandListPdInfo] = useState(initStateList)

    const [categoryNumber, setCategoryNumber] = useState(0)

    const [categoryList, setCategoryList] = useState([initStateCategory])


    const [itemNumber, setItemNumber] = useState(0)

    const [itemList, setItemyList] = useState([])

    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const size = 20

    const [likeCnt, setLikeCnt] = useState(0)

    const { loginState } = UserCustomLogin()
    const userId = loginState.userId

    //브랜드 정보
    useEffect(() => {
        selectBrandNo(brandNo).then(data => {
            setBrandInfo(data)

        })

        selectCategory().then(data => {
            setCategoryList(data)
        })


        if (categoryNumber !== 0 && itemNumber === 0) {
            selectListBrandItem(categoryNumber).then(data => {
                setItemyList(data)
            })
        }

        //전체 목록
        if (categoryNumber === 0 && itemNumber === 0) {
            selectListByBrandPdInfo(brandNo, page, size, userId).then(data => {
                setBrandListPdInfo(data)
                setItemyList(() => [])
            })
            if (likeCnt !== 0) {
                selectListByBrandPdInfo(brandNo, page, size, userId).then(data => {
                    setBrandListPdInfo(data)
                    setItemyList(() => [])
                })
            }
        }

        //카테고리 목록
        if (categoryNumber !== 0 && itemNumber === 0) {
            selectListByBrandCategory(brandNo, categoryNumber, page, size, userId).then(data => {
                setBrandListPdInfo(data)
            })
            if (likeCnt !== 0) {
                selectListByBrandCategory(brandNo, categoryNumber, page, size, userId).then(data => {
                    setBrandListPdInfo(data)
                })
            }
        }

        //카테고리 아이템 목록
        if (categoryNumber !== 0 && itemNumber !== 0) {
            selectListByBrandCategoryItem(brandNo, categoryNumber, itemNumber, page, size, userId).then(data => {
                setBrandListPdInfo(data)
            })
            if (likeCnt !== 0) {
                selectListByBrandCategoryItem(brandNo, categoryNumber, itemNumber, page, size, userId).then(data => {
                    setBrandListPdInfo(data)
                })
            }
        }


    }, [likeCnt, categoryNumber, itemNumber, page, size])

    const handleModifyButton = () => {
        navigate({ pathname: `/brand/modifyPage/${brandInfo.brandNo}` })
    }

    const handleOrderButton = () => {
        navigate({ pathname: `/brand/orderPage/${brandInfo.brandNo}` })
    }

    const handleLikeButton = (pdNo) => {
        if(userId === ''){
            window.confirm('로그인이 필요합니다.')
            return
        }
        insertPdLike(userId, pdNo)
    }

    const handleLikeCancelButton = (pdNo) => {
        if(userId === ''){
            window.confirm('로그인이 필요합니다.')
            return
        }
        removePdLike(userId, pdNo)
    }

    return (
        <div>
            {brandInfo.brandMainImage !== '' && brandInfo.brandMainImage !== null ?
                <img className='h-80 w-full' src={`${host}/brand/view/${brandInfo.brandMainImage}`} />
                : <></>
            }
            <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6 border rounded-lg">
                        <div className="flex flex-col justify-between ">
                            <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                                <div className="flex-1 p-6 undefined ">
                                    <div className="flex flex-col xl:flex-row items-center justify-between ">
                                        <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:mb-0 ">
                                            <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:mb-0">
                                                <img className='h-32 w-32' src={`${host}/brand/view/${brandInfo.brandLog}`} />
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
                                        <div className="text-center md:text-right space-y-2">
                                            <div className='grid grid-cols-2 xl:grid-cols-1'>
                                                <button onClick={() => handleModifyButton()} className="py-2 px-4 border bg-gray-900 text-white min-w-32">정보 수정</button>
                                                <button onClick={() => handleOrderButton()} className="py-2 px-4 border bg-gray-900 text-white min-w-32">주문 확인</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="flex space-x-4 mb-6">
                        <p onClick={() => { setCategoryNumber(() => 0); setItemNumber(() => 0); setPage(() => 1); }}
                            //text-gray-600 hover:text-gray-800
                            className={`${categoryNumber === 0 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                            전체
                        </p>
                        {categoryList && categoryList.map((list, i) => (
                            <p key={i} onClick={() => { setCategoryNumber(() => list.categoryNo); setItemNumber(() => 0); setPage(() => 1); }}
                                //text-gray-600 hover:text-gray-800
                                className={`${list.categoryNo === categoryNumber ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                                {list.categoryNm}
                            </p>
                        ))}
                    </nav>

                    <nav className="flex space-x-4 mb-6">
                        {itemList && itemList.map((list, i) => (
                            <p key={i} onClick={() => { setItemNumber(() => list.itemNo); setPage(() => 1); }}
                                //text-gray-600 hover:text-gray-800
                                className={`${list.itemNo === itemNumber ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                                {list.itemNm}
                            </p>
                        ))}
                    </nav>

                    <div className="bg-white p-6 rounded shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Product</h3>
                            <Link to='/product/productAddPage'>
                                <button className="py-2 px-4 border bg-gray-900 text-white min-w-32">+ 상품 추가</button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {brandListPdInfo && brandListPdInfo.dtoList.map((pdInfo, i) => (

                                <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all" key={i} >
                                    <Link to={`/product/info/${pdInfo.pdNo}`} >
                                        <div
                                            className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                                            <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1" className="h-full w-full object-cover object-top" />
                                        </div>
                                    </Link>
                                    <div className="p-2">
                                        <p className="text-[#767676] text-[14px]">[{pdInfo.brandNm}]</p>
                                        <h3 className="text-lg font-bold text-gray-800">{pdInfo.pdName}</h3>
                                        <div className="mt-4 flex items-center flex-wrap gap-2">
                                            <h4 className="text-lg font-bold text-gray-800">\{ }{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>

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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <PageMoveBrandComponent  setPage={setPage} brandListPdInfo={brandListPdInfo} categoryNumber={categoryNumber} itemNumber={itemNumber} />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default BrandPageComponent;
