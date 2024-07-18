import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { Link } from 'react-router-dom';
import { host } from '../pdInfo/PdInfoByIdComponent';
import { removeOrder, selectOrderListByUser } from '../../api/orderApi';
import OrderPageComponent from '../order/OrderPageComponent';
import { selectUserInfo } from '../../api/userApi';
import dayjs from 'dayjs';
import { FaUserAlt } from "react-icons/fa";

const initState = {
    userId: '',
    pwd: '',
    name: '',
    email: '',
    phone: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    pwd: 'n',
    sexCd: '',
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


function MyPageComponet(props) {

    const [orderList, setOrderList] = useState(initStateList)
    const [userInfo, setUserInfo] = useState(initState)

    const { loginState } = UserCustomLogin()

    const [page, setPage] = useState(1)

    const size = 10

    useEffect(() => {
        selectOrderListByUser(loginState.userId, page, size).then(data => {
            setOrderList(data)
        })

        selectUserInfo(loginState.userId).then((data) => {
            setUserInfo(data)
        })
    }, [loginState.userId, page, size])

    const handlerOrderCancelButton = (ordDtlNo) => {
        removeOrder(ordDtlNo)
        window.location.reload();
    }

    const handleModifyButton = () => {

    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 ">
            {/* grid grid-cols-1 lg:grid-cols-1 gap-6 */}
            <div className=" mb-6 border rounded-lg">
                <div class="flex flex-col justify-between ">
                    <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                        <div className="flex-1 p-6 undefined ">
                            <div className="flex flex-col xl:flex-row items-center justify-between ">
                                <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:mb-0 ">
                                    <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:mb-0">
                                        <FaUserAlt className="h-16 w-16 rounded-full bg-gray-200" />
                                    </span>
                                    <div className="text-center space-y-1 xl:text-left xl:mr-4">
                                        <h4 className="text-xl font-semibold ">{userInfo.name}</h4>
                                        <p className="text-gray-500 dark:text-slate-400">
                                            <b>{userInfo.email}</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center md:text-right space-y-2">
                                    <div>
                                        <Link to={`/user/modifyPage/${loginState.userId}`} >
                                            <button className="py-2 px-4 border bg-gray-900 text-white">프로필 관리</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="mb-3 text-2xl font-bold max-w-7xl mx-auto mt-7 p-2 rounded-lg flex items-center justify-between">주문 내역</h1>
            {orderList.dtoList && orderList.dtoList.map((item, i) => (
                <div key={i}>
                    <div className="max-w-7xl mx-auto mt-2 p-5 border rounded-lg flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">{item.deliStatus}</h2>
                        <p className="text-x text-gray-400  whitespace-normal">(주문 날짜 : {dayjs(item.ordDate).format("YYYY-MM-DD")})</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6 border rounded-lg">
                        <div class="flex flex-col justify-between">
                            <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                                <div className="flex-1 p-6 undefined">
                                    <div className="flex flex-col xl:flex-row items-center justify-between">
                                        <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:lg-0">
                                            <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:lg-0">
                                                <Link to={`/product/info/${item.pdNo}`}>
                                                    <img className="lg:w-96 lg:h-96 xl:w-32 xl:h-32 rounded-lg sm:w-40" src={`${host}/product/view/s_${item.imageFile}`} alt="productImage" />
                                                </Link>
                                            </span>
                                            <div className="text-center space-y-1 xl:text-left xl:mr-6">
                                                <p className="text-xs text-gray-400  whitespace-normal">주문번호 : {item.deliNo}</p>
                                                <h2 className="text-lg font-bold text-gray-900">{item.pdName}</h2>
                                                <p className="text-x text-gray-400  whitespace-normal">[{item.brandNm}] 색상 : {item.color} / 사이즈 : {item.size} / 수량 : {item.count} 개</p>
                                                <p className="text-xs text-gray-400  whitespace-normal">배송지 : ({item.addrNo}) {item.addr} {item.addrDtl}</p>
                                                <p className="text-lg">\{(item.buyAmt * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                            </div>
                                        </div>
                                        <div className="text-center xl:text-right space-y-2">
                                            <div>
                                                {Object.is(`${item.deliStatus}`, '주문 완료') ?
                                                    <div className='grid grid-cols-2 xl:grid-cols-1'>
                                                        <button className="py-2 px-4 border bg-gray-900 text-white ">결제하기</button>
                                                        <button onClick={() => { handlerOrderCancelButton(`${item.ordDtlNo}`) }}
                                                            className="py-2 px-4 border bg-gray-900 text-white ">주문취소</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '결제 완료') || Object.is(`${item.deliStatus}`, '상품 준비중') ?
                                                    <div className=''>
                                                        <button className="py-2 px-4 border bg-gray-900 text-white ">결제취소</button>
                                                    </div>
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <OrderPageComponent orderList={orderList} setPage={setPage} />
        </div>
    );
}

export default MyPageComponet;