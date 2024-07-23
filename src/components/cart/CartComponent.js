import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { Link, useNavigate } from 'react-router-dom';
import useCustomCart from '../../hocks/useCustomCart';
import { host } from '../pdInfo/PdInfoByIdComponent';


function CartComponent(props) {

  const { isLogin, loginState } = UserCustomLogin()

  const { cartItems, refreshCart, changeCartPage, removeCartItemNo } = useCustomCart()

  const [deliAmt, setDeliAmt] = useState(0)

  const [totalAmt, setTotalAmt] = useState(0)

  const [sum, setSum] = useState(0)

  const navigate = useNavigate()

  //체크 박스 이벤트
  const [checkedList, setCheckedList] = useState([])

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item])

      const itemList = (list) => {
        if (list.cartItemNo === parseInt(item)) {
          return true;
        }
      }
      console.log(cartItems.filter(itemList)[0].count)

      setSum(() => sum + parseInt(cartItems.filter(itemList)[0].buyAmt * cartItems.filter(itemList)[0].count))
      setTotalAmt(() => totalAmt + parseInt(cartItems.filter(itemList)[0].buyAmt * cartItems.filter(itemList)[0].count))

    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== item))
      const itemList = (list) => {
        if (list.cartItemNo === parseInt(item)) {
          return true;
        }
      }

      setSum(() => sum - parseInt(cartItems.filter(itemList)[0].buyAmt * cartItems.filter(itemList)[0].count))
      setTotalAmt(() => totalAmt - parseInt(cartItems.filter(itemList)[0].buyAmt * cartItems.filter(itemList)[0].count))
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

  const handleCancelCart = (cartItemNo) => {
    removeCartItemNo(cartItemNo)
  }


  useEffect(() => {
    if (totalAmt < 50000) {
      setDeliAmt(3000);
    } else if (totalAmt > 50000) {
      setDeliAmt(0);
    }
  }, [totalAmt]);


  return (
    <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-lg font-extrabold text-gray-800">Cart</h2>
        <p className="text-[#767676] text-[14px]  mb-5">장바구니</p>
        <h2 className="sm:px-40 md:px-40 lg:px-40 xl:px-96 2xl:mx-96"> </h2>
        {cartItems.length === 0 ?
          <div>
            <h2 className="mt-36 text-lg text-center font-extrabold text-gray-400 mb-10">상품이 없습니다.</h2>
          </div>
          :
          <></>}

        {cartItems.length !== 0 ?
          <div className="border-b border-gray-900/10 pb-8 p">
            <div className="rounded-lg md:w-full">
              {cartItems && cartItems.map((item, i) => (
                <div key={i}>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6 border rounded-lg">
                    <div className="flex flex-col justify-between">
                      <div className="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col ">
                        <div className="flex-1 p-6 undefined">
                          <div className='grid grid-cols-12'>
                            <span className='col-start-12 text-right font-bold text-gray-400 cursor-pointer'
                              onClick={() => handleCancelCart(item.cartItemNo)}
                            >x</span>
                          </div>
                          <div className="flex flex-col xl:flex-row items-center justify-between">
                            <div className="flex flex-col xl:flex-row items-center justify-start xl-6 xl:lg-0">
                              <input className='w-5 h-5 mr-2 xl-6 sm:mb-2 md:mb-2 lg:mb-3' type='checkbox'
                                id={item.cartItemNo}
                                value={item.cartItemNo}
                                onChange={e => { onCheckedElement(e.target.checked, e.target.value) }}
                              />
                              <span className="inline-flex justify-center items-center xl:mr-6 xl-6 xl:lg-0">

                                <Link to={`/product/info/${item.pdNo}`}>
                                  <img className="lg:w-96 lg:h-96 xl:w-32 xl:h-32 rounded-lg sm:w-40" src={`${host}/product/view/s_${item.imageFile}`} alt="productImage" />
                                </Link>
                              </span>
                              <div className="text-center space-y-1 xl:text-left xl:mr-6">
                                <p className="text-x text-gray-400  whitespace-normal">[{item.brandNm}]</p>
                                <h2 className="text-lg font-bold text-gray-900">{item.pdName}</h2>
                                <p className="text-xs text-gray-400  whitespace-normal">색상 : {item.color} / 사이즈 : {item.size} / 수량 : {item.count} 개</p>
                                <p className="text-lg">\{(item.buyAmt * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                              </div>
                            </div>
                            <div className="text-center xl:text-right space-y-2 grid grid-cols-3 xl:grid-cols-3">
                              <span
                                onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) - 1)}
                                className="mt-2 flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-200 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"> - </span>
                              <p className='flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500'>{item.count}</p>
                              <span
                                onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) + 1)}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-200 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"> + </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          : <></>}

        {cartItems.length !== 0 ?
          <div className="rounded-lg border mt-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 ">
            <div className="mb-2 flex justify-between mt-6">
              <p className="text-gray-700">상 품 가 격</p>
              <p className="text-gray-700">\ {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
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
              className="mt-6 mb-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-600">주문하기</button>
          </div>
          : <></>}
      </div>
    </div >
  );
}

export default CartComponent;
