import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_SERVER_HOST, removePdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { Typography } from '@material-tailwind/react';
import ResultModal from '../common/ResultModal';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineHighlight, AiTwotoneDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export const host = API_SERVER_HOST


const initState = {
    brandNo: '',
    categoryNo: '',
    itemNo: '',
    pdNo: '',
    startDate: '',
    pdName: '',
    brandNm: '',
    endDate: '',
    buyAmt: 0,
    likeCnt: '',
    pdImage: '',
    sexCd: '',
    note: '',
    imageList: [],
    sizeList: []

}

function PdInfoByIdComponent({ pdNo }) {

    const loginState = useSelector(state => state.loginSlice)

    const [pdInfo, setPdInfo] = useState(initState)

    const { pageList, modifyPage } = PageCustomMove()

    const [result, setResult] = useState(null)

    const [activeImg, setActiveImage] = useState()

    const [amount, setAmount] = useState(1);

    useEffect(() => {

        console.log("ID COMPO")
        console.log(pdNo)
        selectPdInfoByPdNo(pdNo).then(data => {
            setPdInfo(data)
        })

    }, [pdNo])

    const handleClickRemove = () => {
        removePdInfo(pdInfo).then(data => {
            setResult("상품이 삭제 되었습니다.")
        })
    }

    const closeModal = () => {
        pageList()
    }

    const plusMinuceButton =
        "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";


    return (
        <div>
            <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
                {/* image gallery */}
                <div className="container mx-0 px-3">
                    <img src={`${host}/product/view/${pdInfo.imageList[0]}`} />
                    {/* /image gallery  */}
                </div>
                {/* description  */}

                <div className="mx-0 px-5 lg:px-5">
                    <h2 className="pt-3 text-2xl font-bold lg:pt-0">
                        {pdInfo.pdName}
                    </h2>
                    {/* 브랜드 */}
                    <div className="grid grid-cols-4 gap-1">
                        <p className="mt-5 font-bold"> 브랜드 </p>
                        <p className="mt-5 font-bold text-gray-400"> {pdInfo.brandNm} </p>
                    </div>
                    {/* 성별 */}
                    <div className="grid grid-cols-4 gap-1">
                        <p className="mt-5 font-bold"> 성별 </p>
                        <p className="mt-5 font-bold text-gray-400"> {pdInfo.sexCd} </p>
                    </div>
                    {/* 좋아요 */}
                    <div className="grid grid-cols-4 gap-1">
                        <p className="mt-5 font-bold"> 좋아요 </p>
                        <p className="mt-5 font-bold text-gray-400"> {pdInfo.likeCnt} </p>
                    </div>
                    {/* 가격 */}
                    <p className="mt-4 text-4xl font-bold">
                        \{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    {/* 설명 */}
                    <p className="pt-5 text-sm leading-5 text-gray-500">
                        {pdInfo.note}
                    </p>
                    {/* 사이즈 */}
                    <div className="mt-6">
                        <p className="pb-2 text-xs text-gray-500">사이즈</p>
                        <div className="flex gap-1">
                            {pdInfo.sizeList.map((size, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    >
                                        {size.sizeTpye}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* 색상 */}
                    <div className="mt-6">
                        <p className="pb-2 text-xs text-gray-500">색  상</p>
                        <div className="flex gap-1">
                            {pdInfo.sizeList.map((size, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`h-8 w-8 cursor-pointer border border-white bg-${size.colorCode}-600 focus:ring-2 focus:ring-${size.colorCode}-500 active:ring-2 active:ring-${size.colorCode}-500`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* 수량 */}
                    <div className="mt-6">
                        <p className="pb-2 text-xs text-gray-500">수  량</p>
                        <div className="flex">
                            <button className={`${plusMinuceButton}`} onClick={() => setAmount((prev) => prev - 1)}>−</button>
                            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                {amount}
                            </div>
                            <button className={`${plusMinuceButton}`} onClick={() => setAmount((prev) => prev + 1)}> +</button>
                        </div>
                    </div>
                    <div className="mt-7 flex flex-row items-center gap-6">
                        <button className="flex h-12 w-1/3 items-center justify-center bg-gray-900 text-white duration-100 hover:bg-blue-800">
                            <BiShoppingBag className="mx-2" />
                            Add to cart
                        </button>
                        <button className="flex h-12 w-1/3 items-center justify-center bg-gray-100 duration-100 hover:bg-red-500">
                            <AiOutlineHeart className="mx-2" />
                            Wishlist
                        </button>
                    </div>

                    {loginState.roleNm ?

                        <div className="mt-7 flex flex-row items-center gap-6">
                            <button
                                onClick={() => modifyPage(pdInfo)}
                                className="flex h-12 w-1/3 items-center justify-center bg-gray-900 text-white duration-100 hover:bg-gray-700">
                                <AiOutlineHighlight className="mx-2" />
                                수  정
                            </button>
                            <button
                                onClick={handleClickRemove}
                                className="flex h-12 w-1/3 items-center justify-center bg-gray-100 duration-100 hover:bg-gray-400">
                                <AiTwotoneDelete className="mx-2" />
                                삭  제
                            </button>
                        </div>
                        : <></>}
                </div>
            </section>

            <span className=' text-gray-700 font-semibold '>Info</span>

            <div className='w-full justify-center flex flex-col m-auto items-center'>
                {pdInfo.imageList.map((fileNm, i) =>
                    <img src={`${host}/product/view/${fileNm}`}
                        alt="pdInfo"
                        key={i}
                    />
                )}
            </div>

            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal} /> : <></>}
        </div>


    );
}

export default PdInfoByIdComponent;