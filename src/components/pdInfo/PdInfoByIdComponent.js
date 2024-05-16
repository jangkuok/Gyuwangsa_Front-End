import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { removePdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { Typography } from '@material-tailwind/react';
import ResultModal from '../common/ResultModal';

const initState = {
    brandNo: '',
    categoryNo: '',
    itemNo: '',
    pdNo: '',
    startDate: '',
    pdName: '',
    endDate: '',
    buyAmt: '',
    likeCnt: '',
    pdImage: '',
    sexCd: '',
    note: ''
}

function PdInfoByIdComponent({pdNo}) {
    
    const [pdInfo, setPdInfo] = useState(initState)

    const {pageList,modifyPage } = PageCustomMove()

    const [result, setResult] = useState(null)

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

    const [images, setImages] = useState({
        img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
    })

    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);

    const closeModal = () =>{
        pageList()
    }

    return (
        <div>
            <div className='flex flex-col justify-center lg:flex-row gap-16 lg:items-center'>
                {/* 이미지 */}
                <div className='flex flex-col gap-6 lg:w-2/4'>
                    <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                    <div className='flex flex-row justify-between h-24'>
                        <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
                        <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
                        <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
                        <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
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
            <div className="mt-6 flex items-center justify-end gap-x-6">

            </div>


            <div className="border-b border-gray-900/20 pb-2" />
            <span className=' text-gray-700 font-semibold '>Info</span>
            
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}/> : <></>}
        </div>


    );
}

export default PdInfoByIdComponent;