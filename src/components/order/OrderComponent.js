import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addOrder, orderPageLoad } from '../../api/orderApi';
import { host } from '../pdInfo/PdInfoByIdComponent';
import AddressPopModal from '../../hocks/addressPopModal';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../api/userApi';
import UserCustomLogin from '../../hocks/userCustomLogin';

const initState = {
    orderDtlNo: '',
    addr: '',
    addrNo: '',
    addrDtl: '',
    buyAmt: '',
    color: '',
    email: '',
    size: '',
    deliNo: '',
    deliState: '',
    phone: '',
    ordNo: '',
    pdNo: '',
}

const userInitState = {
    userId: '',
    name: '',
    phone: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    deliNo: ''
}


function OrderComponent(props) {

    const location = useLocation()

    const orderList = { ...location.state }

    const [order, setOrder] = useState([])

    const [user, setUser] = useState(userInitState)

    const { loginState } = UserCustomLogin()

    const [orderName, setOrderName] = useState('')

    const deliNo = `od_${new Date().getTime()}`

    const navigate = useNavigate()

    //선택한 상품 리스트
    useEffect(() => {
        orderPageLoad(orderList).then(data => {
            setOrder(data)
            if (data.length > 1) {
                setOrderName(data[0].pdName + " 외 " + (data.length - 1))
            } else {
                setOrderName(data[0].pdName)
            }

        })

    }, [])

    //사용자 정보
    useEffect(() => {
        selectUserInfo(loginState.userId).then(data => {
            setUser(data)
        })
    }, [loginState.userId])

    //결제 api
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery); document.head.removeChild(iamport);
        }
    }, []);

    //정보 주입
    const handleChangeUser = (e) => {
        user[e.target.name] = e.target.value
        setUser({ ...user })
    }

    // 주소 검색
    const [address, setAddress] = useState({
        address: user.addr,
        zonecode: user.addrNo
    });

    const [popup, setPopup] = useState(false);

    const handleAddressButton = (data) => {
        setPopup(!popup);
    }
    console.log(orderName)

    //주문 정보 담기
    const orderListDto = order.map((list) => {
        return {
            addr: address.address,
            addrNo: address.zonecode,
            addrDtl: user.addrDtl,
            buyAmt: list.buyAmt,
            color: list.color,
            size: list.size,
            count: list.count,
            deliState: '주문 완료',
            phone: user.phone,
            pdNo: list.pdNo,
            pdName: list.pdName,
            userId: user.userId,
            brandNo: list.brandNo,
            deliNo: deliNo
        }
    })

    const formData = new FormData()
    const jsonOrder = JSON.stringify(orderListDto)
    const orderDtlDTO = new Blob([jsonOrder], { type: 'application/json' })

    formData.append("orderDtlDTO", orderDtlDTO)

    //결제 성공 / 실패
    const callback = (response) => {
        const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = response;
        if (success) {
            alert('결제 성공');

            addOrder(formData)

            window.confirm('주문을 완료 했습니다.')
            navigate({ pathname: '/user/myPage' }, { replace: true })
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    }

    //주문 버튼
    const handleOrderButton = () => {

        const { IMP } = window;
        IMP.init('imp15164671'); // 결제 데이터 정의
        const data = {
            pg: 'kakaopay', // PG사 (필수항목)
            pay_method: 'card', // 결제수단 (필수항목)
            merchant_uid: deliNo, // 결제금액 (필수항목)
            name: orderName, // 주문명 (필수항목)
            amount: '1', // 금액 (필수항목)
            custom_data: { name: '부가정보', desc: '세부 부가정보' },
            buyer_name: user.name, // 구매자 이름
            buyer_tel: user.phone, // 구매자 전화번호 (필수항목)
            buyer_email: user.email, // 구매자 이메일
            buyer_addr: address.zonecode,
            buyer_postalcode: address.address + ' ' + user.addrDtl
        };

        IMP.request_pay(data, callback);




    }


    const textTpyeClass = 'text-base text-gray-500 font-semibold mb-2 block'

    return (

        <div className="h-screen pt-20">
            <h1 className="mb-10 text-2xl font-bold">주문하기</h1>

            <div className=" space-y-5 max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="rounded-lg md:w-full">
                        {order.map((item) => (
                            <div key={item.cartItemNo}>
                                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <Link to={`/product/info/${item.pdNo}`}>
                                        <img src={`${host}/product/view/s_${item.imageFile}`} alt="productImage" className="w-16 rounded-lg sm:w-16" />
                                    </Link>
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">{item.pdName}</h2>
                                            <p className="text-x text-gray-400  whitespace-normal">[{item.brandNm}] 색상 : {item.color} / 사이즈 : {item.size} / 수량 : {item.count}</p>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-lg">\{(item.buyAmt * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* 이름 */}
            <div className="space-y-5 max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이  름
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={user.name}
                                    className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 핸드폰 번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                핸드폰 번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={user.phone}
                                    className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 우편번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                우편번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="addrNo"
                                id="addrNo"
                                value={address.zonecode}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>

                        <div className="sm:col-span-1">
                            <button type="button"
                                onClick={handleAddressButton}
                                className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                검  색
                            </button>
                            {popup && <AddressPopModal company={address} setcompany={setAddress} />}
                        </div>

                        {/* 주소 */}

                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                주  소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addr"
                                id="addr"
                                value={address.address}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>
                        {/* 상세 주소 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                상세 주소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addrDtl"
                                id="addrDtl"
                                onChange={handleChangeUser}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-white  max-w-4xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-5 mt-14 ">
                <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">$129.99</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">$4.99</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                        <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                        <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                </div>
                <button
                    onClick={handleOrderButton}
                    className="mt-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">주문하기</button>
            </div>
        </div>
    );
}

export default OrderComponent;