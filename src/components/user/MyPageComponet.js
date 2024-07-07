import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { Link } from 'react-router-dom';
import { host } from '../pdInfo/PdInfoByIdComponent';
import { removeOrder, selectOrderListByUser } from '../../api/orderApi';

function MyPageComponet(props) {

    const [orderList, setOrderList] = useState([])

    const { loginState } = UserCustomLogin()

    useEffect(() => {
        selectOrderListByUser(loginState.userId).then(data => {
            setOrderList(data)
        })
    }, [])

    const handlerOrderCancelButton = (ordDtlNo) => {
        removeOrder(ordDtlNo)
        window.location.reload();
    }

    return (
        <div className="h-screen pt-20">
            <h1 className="mb-10 text-2xl font-bold">주문 목록</h1>
            <div className=" space-y-5 max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="rounded-lg md:w-full">
                    </div>
                    {orderList.dtoList && orderList.dtoList.map((item, i) => (
                        <div key={i}>
                            <h2 className="text-lg font-bold text-gray-900">{item.deliStatus}</h2>
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <Link to={`/product/info/${item.pdNo}`}>
                                    <img className="w-32 h-32 rounded-lg sm:w-40" src={`${host}/product/view/s_${item.imageFile}`} alt="productImage"/>
                                </Link>
                                <div className="sm:ml-5 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        
                                        <p className="text-xs text-gray-400  whitespace-normal">주문번호 : {item.deliNo}</p>
                                        <h2 className="text-lg font-bold text-gray-900">{item.pdName}</h2>
                                        <p className="text-x text-gray-400  whitespace-normal">[{item.brandNm}] 색상 : {item.color} / 사이즈 : {item.size} / 수량 : {item.count} 개</p>
                                        <p className="text-xs text-gray-400  whitespace-normal">배송지 : ({item.addrNo}) {item.addr} {item.addrDtl}</p>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-lg">\{(item.buyAmt * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="">
                                            {Object.is(`${item.deliStatus}`, '주문 완료') ?
                                                <div className='justify-center'>
                                                    <button
                                                        className="mt-6 w-full  rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">결제하기</button>
                                                    <button
                                                        onClick={() => {handlerOrderCancelButton(`${item.ordDtlNo}`)}}
                                                        className="mt-6 w-full  rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">주문취소</button>
                                                </div>
                                                : <></>

                                            }
                                            {Object.is(`${item.deliStatus}`, '결제 완료') || Object.is(`${item.deliStatus}`, '상품 준비중') ?
                                                <div className='justify-center'>
                                                    <button
                                                        className="mt-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">결제하기</button>
                                                </div>
                                                : <></>
                                            }
                                        </div>

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

export default MyPageComponet;