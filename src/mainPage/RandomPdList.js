import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../hocks/userCustomLogin';
import { API_SERVER_HOST, selectRandomPdList } from '../api/pdInfoApi';
import { insertPdLike, removePdLike } from '../api/likeApi';
import { Link } from 'react-router-dom';


export const host = API_SERVER_HOST


function RandomPdList(props) {

    const [pdInfoList, setPdInfoList] = useState([])


    const { loginState } = UserCustomLogin()
    const userId = loginState.userId
    const [likeCnt, setLikeCnt] = useState(0)


    useEffect(() => {
        selectRandomPdList().then(data => {
            setPdInfoList(data)
        })

        if (likeCnt !== 0) {
            selectRandomPdList().then(data => {
                setPdInfoList(data)
            })
        }

    }, [likeCnt, userId])

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

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <div className="border-b border-gray-300 pb-9">
                <h2 className="text-lg font-extrabold text-gray-800">Random Product</h2>
                <p className="text-[#767676] text-[14px]  mb-5">랜덤 상품</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {pdInfoList.map((pdInfo, i) => (
                        <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all" key={i}>
                            <Link to={`/product/info/${pdInfo.pdNo}`} >
                                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                                    <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1"
                                        className="h-full w-full object-cover object-top" />
                                </div>
                            </Link>
                            <div className="p-2">
                                <Link to={`/brand/${pdInfo.brandNo}`}>
                                    <p className="text-[#767676] text-[14px]">[{pdInfo.brandNm}]</p>
                                </Link>
                                <h3 className="text-lg font-bold text-gray-800">{pdInfo.pdName}</h3>
                                <div className="flex items-center flex-wrap gap-2">
                                    <h4 className="text-lg font-bold text-gray-800">\{ }{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RandomPdList;