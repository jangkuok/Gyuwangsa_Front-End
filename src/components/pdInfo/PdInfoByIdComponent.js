import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_SERVER_HOST, removePdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { Typography } from '@material-tailwind/react';
import ResultModal from '../common/ResultModal';

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

    return (
        <div>
            <div className='flex flex-col justify-center lg:flex-row gap-16 lg:items-center'>
                {/* 이미지 */}
                <div className='flex flex-col gap-6 lg:w-2/4'>
                    <img src={`${host}/product/view/` + activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                    <div className='flex flex-row justify-between h-24'>
                    <img src={`${host}/product/view/${pdInfo.imageList[0]}`}
                                alt="pdInfo"
                                className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(pdInfo.imageList[0])} />
                    <img src={`${host}/product/view/${pdInfo.imageList[1]}`}
                                alt="pdInfo"
                                className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(pdInfo.imageList[1])} />
                    <img src={`${host}/product/view/${pdInfo.imageList[2]}`}
                                alt="pdInfo"
                                className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(pdInfo.imageList[2])} />
                    <img src={`${host}/product/view/${pdInfo.imageList[3]}`}
                                alt="pdInfo"
                                className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(pdInfo.imageList[3])} />
                    </div>
                </div>
                {/* 상품 */}
                <div className='flex flex-col gap-4 lg:w-2/4'>
                    <div>
                        <span className=' text-gray-700 font-semibold '>Product Info</span>
                        <h1 className='text-3xl font-bold'>{pdInfo.pdName}</h1>
                    </div>
                    <div className="border-b border-gray-900/20 pb-2">
                        <p className='text-gray-700 font-bold'>
                            브랜드 / 상품 번호{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{pdInfo.brandNo} / {pdInfo.pdNo}
                        </p>
                        <p className='text-gray-700 font-bold'>
                            성별 {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{pdInfo.sexCd}
                        </p>

                        <p className='text-gray-700 font-bold'>
                            좋아요 {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{pdInfo.likeCnt}
                        </p>
                    </div>

                    <Typography color="blue-gray" variant="h6">
                        Color
                    </Typography>
                    <div className="my-8 mt-3 flex items-center gap-2">
                        <div className="h-5 w-5 rounded border border-gray-900 bg-blue-gray-600 "></div>
                        <div className="h-5 w-5 rounded border border-blue-gray-100 "></div>
                        <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900 "></div>
                    </div>

                    <h6 className='text-2xl font-semibold'> \ {pdInfo.buyAmt}</h6>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                            <button className='bg-gray-200 py-2 px-5 rounded-lg text-gray-900 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                            <span className='py-4 px-6 rounded-lg'>{amount}</span>
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-gray-900 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                        </div>
                        <button className='bg-gray-900 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                    </div>

                    <div className='flex flex-row items-center gap-12'>
                        <button
                            type="button"
                            onClick={() => modifyPage(pdInfo)}
                            className='bg-gray-900 text-white font-semibold py-3 px-16 rounded-xl h-full'
                        >
                            수  정
                        </button>
                        <button
                            type="button"
                            onClick={handleClickRemove}
                            className='bg-gray-100 text-gray-900 font-semibold py-3 px-16 rounded-xl h-full'
                        >
                            삭  제
                        </button>
                    </div>
                </div>
            </div>
  
            <div className="border-b border-gray-900/20 pb-2" />
            <span className=' text-gray-700 font-semibold '>Info</span>

            <div className='w-full justify-center flex flex-col m-auto items-center'>
                {pdInfo.imageList.map((fileNm, i) =>
                    <img src={`${host}/product/view/${fileNm}`}
                        alt="pdInfo"
                        key={i}
                        className='w-24 h-24 rounded-md cursor-pointer' />
                )}
            </div>

            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal} /> : <></>}
        </div>


    );
}

export default PdInfoByIdComponent;