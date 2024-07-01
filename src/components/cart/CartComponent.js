import React, { useEffect, useState } from 'react';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAsync } from '../../slices/cartSlice';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import useCustomCart from '../../hocks/useCustomCart';
import { host } from '../pdInfo/PdInfoByIdComponent';

function CartComponent(props) {

  const { isLogin, loginState } = UserCustomLogin()

  const { cartItems, refreshCart, changeCartPage } = useCustomCart()

  const [totalAmt, setTotalAmt] = useState("");

  const [shippingCharge, setShippingCharge] = useState("");


  useEffect(() => {
    if (isLogin) {
      refreshCart()
    }
  }, [isLogin])

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleClickCount = (cartItemNo, pdNo, amount) => {
    console.log(amount)
    changeCartPage({ userId: loginState.userId, cartItemNo: cartItemNo, pdNo: pdNo, count: amount })
  }

  return (

    <div className="w-full mt-2 mdl:w-[80%] lgl:w-[80%] h-full flex flex-col gap-10">
      <p className="mt-4 text-4xl font-bold">
        장바구니
      </p>
      {cartItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">상 품</h2>
            <h2>가 격</h2>
            <h2>수 량</h2>
            <h2>합 계</h2>
          </div>
          <div className="mt-5">
            {cartItems.map((item) => (
              <div key={item.cartItemNo}>
                <div className="w-full grid grid-cols-5 mb-4 border py-2">
                  <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                    <ImCross
                      onClick={''}
                      className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                    />
                    <img className="w-32 h-32" src={`${host}/product/view/s_${item.imageFile}`} alt="productImage" />
                    <h1 className="font-titleFont font-semibold whitespace-pre-wrap">{item.pdName}</h1>
                    <p className='text-x text-gray-400  whitespace-normal'>색상 : {item.color}</p>
                    <p className='text-x text-gray-400  whitespace-normal'>사이즈 : {item.color}</p>
                  </div>
                  <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                    <div className="flex w-1/3 items-center text-lg font-semibold">
                      \{item.buyAmt}
                    </div>
                    <div className="w-1/3 flex items-center gap-6 text-lg">
                      <span
                        onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) - 1)}
                        className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                      >
                        -
                      </span>
                      <p>{item.count}</p>
                      <span
                        onClick={() => handleClickCount(`${item.cartItemNo}`, `${item.pdNo}`, parseInt(`${item.count}`) + 1)}
                        className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                      >
                        +
                      </span>
                    </div>
                    <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                      <p>\{item.count * item.buyAmt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

  

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <motion.div
        //   initial={{ y: 30, opacity: 0 }}
        //   animate={{ y: 0, opacity: 1 }}
        //   transition={{ duration: 0.4 }}
        //   className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        // >
        //   <div>
        //     <img
        //       className="w-80 rounded-lg p-4 mx-auto"
        //       src={emptyCart}
        //       alt="emptyCart"
        //     />
        //   </div>
        //   <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
        //     <h1 className="font-titleFont text-xl font-bold uppercase">
        //       Your Cart feels lonely.
        //     </h1>
        //     <p className="text-sm text-center px-10 -mt-2">
        //       Your Shopping cart lives to serve. Give it purpose - fill it with
        //       books, electronics, videos, etc. and make it happy.
        //     </p>
        //     <Link to="/shop">
        //       <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
        //         Continue Shopping
        //       </button>
        //     </Link>
        //   </div>
        // </motion.div>
        <></>
      )}
    </div>
  );
}

export default CartComponent;