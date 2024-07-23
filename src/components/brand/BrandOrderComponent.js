import React, { useEffect, useState } from 'react';
import { selectBrandNo, selectBrandOrderDeliStatus, selectBrandOrderList } from '../../api/brandApi';
import { Link } from 'react-router-dom';
import { host } from '../pdInfo/PdInfoByIdComponent';
import dayjs from 'dayjs';
import BrandOrderPageComponent from './BrandOrderPageComponent';
import { removeOrder } from '../../api/orderApi';


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

function BrandOrderComponent({ brandNo }) {

    const [orderList, setOrderList] = useState(initStateList)
    const [brand, setBrand] = useState(initState)
    const [orderState, setOrderState] = useState(0)
    const [page, setPage] = useState(1)
    const size = 10
    //const [changeDelStatus,setChangeDelStatus] = useState('')
    let changeDelStatus = ''


    useEffect(() => {
        selectBrandNo(brandNo).then(data => {
            setBrand(data)
        })

        //전체 목록
        if (orderState == 0) {
            selectBrandOrderList(brandNo, page, size).then((data) => {
                setOrderList(data)
            })
        }

        //상태 목록
        if (orderState == 1) {
            selectBrandOrderDeliStatus(brandNo, '주문 완료', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 2) {
            selectBrandOrderDeliStatus(brandNo, '결제 완료', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 3) {
            selectBrandOrderDeliStatus(brandNo, '상품 준비중', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 4) {
            selectBrandOrderDeliStatus(brandNo, '배송 대기중', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 5) {
            selectBrandOrderDeliStatus(brandNo, '배송중', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 6) {
            selectBrandOrderDeliStatus(brandNo, '배송 완료', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 7) {
            selectBrandOrderDeliStatus(brandNo, '교환 신청', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 8) {
            selectBrandOrderDeliStatus(brandNo, '교환 중', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 9) {
            selectBrandOrderDeliStatus(brandNo, '교환 완료', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 10) {
            selectBrandOrderDeliStatus(brandNo, '환불 신청', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 11) {
            selectBrandOrderDeliStatus(brandNo, '환불중', page, size).then((data) => {
                setOrderList(data)

            })
        }

        if (orderState == 12) {
            selectBrandOrderDeliStatus(brandNo, '환불 완료', page, size).then((data) => {
                setOrderList(data)

            })
        }
    }, [brandNo, orderState, page, size])

    const orderDeliState = (ordDtlNo, deliState) => {
        if (window.confirm('[ ' + deliState + ' ]' + '로(으로) 변경 하시겠습니까?') == false) {
            return
        }
        removeOrder(ordDtlNo, deliState)
        window.location.reload()
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 ">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6 border rounded-lg">
                <div class="flex flex-col justify-between ">
                    <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                        <div className="flex-1 p-6 undefined ">
                            <div className="flex flex-col xl:flex-row items-center justify-between ">
                                <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:mb-0 ">
                                    <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:mb-0">
                                        <img className='h-16 w-16' src={`${host}/brand/view/${brand.brandLog}`} />
                                    </span>
                                    <div className="text-center space-y-1 xl:text-left xl:mr-4">
                                        <h4 className="text-xl font-semibold ">{brand.engNm}</h4>
                                        <p className="text-gray-500 dark:text-slate-400">
                                            <b>{brand.brandNm}</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center md:text-right space-y-2">
                                    <div>
                                        <Link to={`/brand/${brandNo}`} >
                                            <button className="py-2 px-4 border bg-gray-900 text-white min-w-32">브랜드 페이지</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-3 p-3 border rounded-lg">
                <nav className="flex space-x-4 mb-6 ">
                    <p
                        onClick={() => { setOrderState(() => 0); setPage(() => 1); }}
                        className={`${orderState === 0 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        전체
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 1); setPage(() => 1); }}
                        className={`${orderState === 1 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        주문 완료
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 2); setPage(() => 1); }}
                        className={`${orderState === 2 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        결제 완료
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 3); setPage(() => 1); }}
                        className={`${orderState === 3 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        상품 준비중
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 4); setPage(() => 1); }}
                        className={`${orderState === 4 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        배송 대기중
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 5); setPage(() => 1); }}
                        className={`${orderState === 5 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        배송중
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 6); setPage(() => 1); }}
                        className={`${orderState === 6 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        배송 완료
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 7); setPage(() => 1); }}
                        className={`${orderState === 7 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        교환 신청
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 8); setPage(() => 1); }}
                        className={`${orderState === 8 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        교환중
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 9); setPage(() => 1); }}
                        className={`${orderState === 9 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        교환 완료
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 10); setPage(() => 1); }}
                        className={`${orderState === 10 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        환불 신청
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 11); setPage(() => 1); }}
                        className={`${orderState === 11 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        환불중
                    </p>
                    <p
                        onClick={() => { setOrderState(() => 12); setPage(() => 1); }}
                        className={`${orderState === 12 ? 'text-gray-900 font-bold border-b-2 border-gray-600' : 'text-gray-400 hover:text-gray-800'} cursor-pointer`}>
                        환불 완료
                    </p>
                </nav>
            </div>

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
                                                {Object.is(`${item.deliStatus}`, '결제 완료') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '상품 준비중') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">상품 준비 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '상품 준비중') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '배송 대기중') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">배송 대기 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '배송 대기중') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '배송중') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">배송 시작 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '배송중') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '배송 완료') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">배송 완료 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '배송 완료') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '교환중') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">교환 시작 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '교환중') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '교환 완료') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">교환 완료 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '교환 완료') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '환불중') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">환불 시작 신청</button>
                                                    </div>
                                                    : <></>
                                                }
                                                {Object.is(`${item.deliStatus}`, '환불중') ?
                                                    <div className='justify-center'>
                                                        <button onClick={() => { orderDeliState(item.ordDtlNo, '환불 완료') }} className="py-2 px-4 border bg-gray-900 text-white min-w-32">환불 완료 신청</button>
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

            <BrandOrderPageComponent orderList={orderList} setPage={setPage} />
        </div>
    );
}

export default BrandOrderComponent;