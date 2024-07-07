import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAsync } from '../../slices/cartSlice';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import useCustomCart from '../../hocks/useCustomCart';
import { host } from '../pdInfo/PdInfoByIdComponent';
import { orderPageLoad } from '../../api/orderApi';

function CartComponent(props) {

  const { isLogin, loginState } = UserCustomLogin()

  const { cartItems, refreshCart, changeCartPage } = useCustomCart()

  const [deliAmt, setDeliAmt] = useState(0)

  const [totalAmt, setTotalAmt] = useState(0)

  const [sum, setSum] = useState(0)

  const navigate = useNavigate()

  //체크 박스 이벤트
  const [checkedList, setCheckedList] = useState([])

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item])
    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== item))
    }
  }

  //주문 페이지 이동
  const onClickOrderPage = () => {
    if (checkedList.length == 0) {
      window.confirm('선택한 상품이 없습니다.')
      return
    }
    navigate({ pathname: '/order/orderPage' }, { state: checkedList })
  }


  //상품 상태 변경 시
  useEffect(() => {
    if (isLogin) {
      refreshCart()
    }
  }, [isLogin])


  const handleClickCount = (cartItemNo, pdNo, amount) => {
    changeCartPage({ userId: loginState.userId, cartItemNo: cartItemNo, pdNo: pdNo, count: amount })
  }


  useEffect(() => {
    if (totalAmt < 50000) {
      setDeliAmt(3000);
    } else if (totalAmt > 50000) {
      setDeliAmt(0);
    } 
  }, [totalAmt]);


  return (
    <div className="h-screen pt-20">
      <h1 className="mb-10 text-2xl font-bold">장바구니</h1>
      <div className=" space-y-5 max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-5">
        <div className="border-b border-gray-900/10 pb-8 p">
          <div className="rounded-lg md:w-full">
            {cartItems.map((item) => (
              <div key={item.cartItemNo}>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <input className='w-6 h-6 mr-2' type='checkbox'
                    id={item.cartItemNo}
                    value={item.cartItemNo}
                    onChange={e => { onCheckedElement(e.target.checked, e.target.value) }}
                  />
                  <Link to={`/product/info/${item.pdNo}`}>
                    <img className="w-32 h-32" src={`${host}/product/view/s_${item.imageFile}`} alt="productImage" class="w-full rounded-lg sm:w-40" />
                  </Link>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <Link to={`/product/info/${item.pdNo}`}>
                        <h2 className="text-lg font-bold text-gray-900">{item.pdName}</h2>
                      </Link>
                      <p className="text-x text-gray-400  whitespace-normal">[{item.brandNm}] 색상 : {item.color} / 사이즈 : {item.size}</p>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) - 1)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-gray-900 hover:text-blue-50"> - </span>
                        <p className='h-7 w-7 text-center'>{item.count}</p>
                        <span
                          onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) + 1)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-gray-900 hover:text-blue-50"> + </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg">\ {(item.buyAmt * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-white  max-w-4xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-5 mt-14 ">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">상 품 가 격</p>
          <p className="text-gray-700">\ 129.99</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">배 송 비</p>
          <p className="text-gray-700">\ {deliAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">\ {(totalAmt + deliAmt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
        <button
          onClick={() => { onClickOrderPage() }}
          className="mt-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">주문하기</button>
      </div>
    </div >

  );
}

export default CartComponent;
