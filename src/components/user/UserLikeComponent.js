import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { insertPdLike, removePdLike, selectUserIdLikeChk, selectUserIdLikePdInfo } from '../../api/likeApi';
import { Link } from 'react-router-dom';
import { host } from '../pdInfo/PdInfoListComponent';


function UserLikeComponent(props) {

    const { loginState } = UserCustomLogin()
    const [likeList, setLikeList] = useState([])

    const [likeCnt, setLikeCnt] = useState(0)

    useEffect(() => {
        selectUserIdLikePdInfo(loginState.userId).then((data) => {
            setLikeList(data)
        })

        // if (likeCnt !== 0) {
        //     selectUserIdLikePdInfo(loginState.userId).then((data) => {
        //         setLikeList(data)
        //     })
        // }
    }, [loginState.userId])

    const handleLikeCancelButton = (pdNo) => {
        removePdLike(loginState.userId, pdNo)   

        const itemList = (list) => {
            if (list.pdNo === pdNo) {
              list.likeFlag = false
            }
          }
      
          likeList.filter(itemList)
    }

    return (
        <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-extrabold text-gray-800 ">Like({likeList.length}개)</h2>
                <p className="text-[#767676] text-[14px] mb-14">좋아요</p>
                <h2 className="sm:px-40 md:px-40 lg:px-40 xl:px-96 2xl:mx-96"> </h2>
                {likeList.length === 0 ?
                    <div>
                        <h2 className="mt-36 text-lg text-center font-extrabold text-gray-400 mb-10">관심 상품이 없습니다.</h2>
                    </div>
                    : <></>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {likeList && likeList.map((pdInfo, i) => (
                        pdInfo.likeFlag === true ?
                        <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all" key={i}>
                            <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                                <Link to={`/product/info/${pdInfo.pdNo}`}>
                                    <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1" className="h-full w-full object-cover object-top" />
                                </Link>
                            </div>
                            <div className="p-2">
                                <Link to={`/brand/${pdInfo.brandNo}`}>
                                    <p className="text-[#767676] text-[14px]">[{pdInfo.brandNm}]</p>
                                </Link>
                                <h3 className="text-[15px] font-bold text-gray-800 max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap ">{pdInfo.pdName}</h3>
                                <div className="flex items-center flex-wrap gap-2">
                                    <h4 className="text-[13px] font-bold text-gray-800">\{ }{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                                    {loginState.roleNm !== 'BRAND_MANAGER' ?
                                        <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
                                            {pdInfo.likeFlag === true ?
                                                <svg
                                                    onClick={() => { handleLikeCancelButton(pdInfo.pdNo); setLikeCnt((prev) => prev + 2);}}
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
                        :<></>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserLikeComponent;