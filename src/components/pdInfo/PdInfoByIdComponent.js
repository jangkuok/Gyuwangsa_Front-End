import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_SERVER_HOST, removePdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { Typography } from '@material-tailwind/react';
import ResultModal from '../common/ResultModal';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineHighlight, AiTwotoneDelete } from 'react-icons/ai';
import useCustomCart from '../../hocks/useCustomCart';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { Link, useNavigate } from 'react-router-dom';
import { selectBrandNo } from '../../api/brandApi';
import PdInfoSizeComponent from './PdInfoSizeComponent';
import { getCookie } from '../../util/cookieUtil';

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

const initStateChoice = {
    no: '',
    userId: '',
    pdNo: '',
    size: '',
    color: '',
    count: '1'
}

const initStateBrand = {
    brandNo: '',
    brandNm: '',
    engNm: '',
    brandLog: '',
    brandMainImage: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    comCall: '',
    comEmail: '',
    deliComp: '',
    stateCd: '',
    startDate: '',
    endDate: '',
    note: '',
}

function PdInfoByIdComponent({ pdNo }) {

    const [pdInfo, setPdInfo] = useState(initState)

    const [brand, setBrand] = useState(initStateBrand)

    const { pageList, modifyPage } = PageCustomMove()

    const { changeCart } = useCustomCart()

    const [amount, setAmount] = useState(1);

    const [count, setCount] = useState(1);

    const [choicePdInfo, setChoicePdInfo] = useState({ ...initStateChoice })

    const [choicePdInfoList, setChoicePdInfoList] = useState([])

    const navigate = useNavigate()


    const { loginState } = UserCustomLogin()

    const userRoleNm = loginState.roleNm

    const brandAdmin = loginState.brandCd

    useEffect(() => {
        selectPdInfoByPdNo(pdNo).then((data) => {
            setPdInfo(data)
            selectBrandNo(data.brandNo).then((data) => {
                setBrand(data)
            })
        })
    }, [pdNo])

    //상품 사이즈 
    const sizeList = pdInfo.sizeList.map((size) => {
        return {
            sizeType: size.sizeType,
        }
    })

    //사이즈 리스트(중복제거)
    const changeSizeList = [
        ...new Set(sizeList.map((size) => JSON.stringify(size))),
    ].map((size) => JSON.parse(size))


    //상품 색상
    const colorList = pdInfo.sizeList.map((size) => {
        return {
            color: size.color,
            colorCode: size.colorCode
        }
    })

    //색상 리스트(중복제거)
    const changeColorList = [
        ...new Set(colorList.map((color) => JSON.stringify(color))),
    ].map((color) => JSON.parse(color))


    //상품 색상 선택
    const handleColor = (color) => {
        choicePdInfo.color = color
        setChoicePdInfo({ ...choicePdInfo })
    }

    //상품 사이즈 선택
    const handleSize = (size) => {
        choicePdInfo.size = size

        choicePdInfo.no = count
        setCount(parseInt(count) + 1)

        choicePdInfo.pdNo = pdInfo.pdNo

        choicePdInfo.userId = loginState.userId
        setChoicePdInfo({ ...choicePdInfo })
    }

    //상품 수량 선택
    //마이너스
    const handleMinusCount = (index) => {
        choicePdInfoList[index].count = parseInt(choicePdInfoList[index].count) - 1
        if (choicePdInfoList[index].count = 0) {
            choicePdInfoList[index].count = 1
        }
        setChoicePdInfo({ ...choicePdInfo })
    }

    //플러스
    const handlePlusCount = (index) => {
        choicePdInfoList[index].count = parseInt(choicePdInfoList[index].count) + 1
        setChoicePdInfo({ ...choicePdInfo })
    }

    //선택 상품 삭제
    const handleRemoveList = (no) => {
        const resultInfo = choicePdInfoList.filter(choicePdInfoList => choicePdInfoList.no != no)
        setChoicePdInfoList(resultInfo)
    }

    //선택한 상품 리스트 등록
    if (!Object.is('', choicePdInfo.color) && !Object.is('', choicePdInfo.size)) {


        // const itemList = (list) => {
        //     if (list.color === choicePdInfo.color && list.size === choicePdInfo.size) {
        //         list.count = parseInt(list.count) + 1
        //         setChoicePdInfo({ ...initStateChoice })
        //         return true;
        //     }
        // }

        // if (choicePdInfoList.filter(itemList) === false) {
        //     setChoicePdInfoList([...choicePdInfoList, choicePdInfo])
        //     setChoicePdInfo({ ...initStateChoice })
        // }

        // const itemList = (list) => {
        //     if (list.color !== choicePdInfo.color && list.size !== choicePdInfo.size) {
        //         console.log(list)
        //         setChoicePdInfoList([...choicePdInfoList, choicePdInfo])
        //         setChoicePdInfo({ ...initStateChoice })

        //     }else{
        //         list.count = parseInt(list.count) + 1
        //         setChoicePdInfo({ ...initStateChoice })
        //         return true;
        //     }
        // }

        // choicePdInfoList.filter(itemList)

        const itemList = (list) => {
            if (list.color === choicePdInfo.color && list.size === choicePdInfo.size) {
                list.count = parseInt(list.count) + 1
                setChoicePdInfo({ ...initStateChoice })
                return true
            }
        }

        if (choicePdInfoList.filter(itemList).length === 0) {
            setChoicePdInfoList([...choicePdInfoList, choicePdInfo])
            setChoicePdInfo({ ...initStateChoice })
        }


    }

    //상품 삭제
    const handleClickRemove = () => {
        removePdInfo(pdInfo).then(data => {
            window.confirm("상품이 삭제 되었습니다.")
            navigate({ pathname: '/' }, { replace: true })
        })
    }

    //장바구니 등록
    const handleAddCart = () => {

        if (choicePdInfoList.length === 0) {
            window.confirm('선택한 상품이 없습니다.')
            return
        }
        if (loginState.userId === '') {
            window.confirm('로그인이 필요합니다.')
            return
        }

        let count = 1
        //const addedItem = cartItems.filter(item => item.pdNo == parseInt(pdNo) && item.color == color && item.size == size)[0]
        // const addedItem = cartItems.filter(item => item.pdNo == parseInt(pdNo))[0]
        // if (addedItem) {
        //     if (window.confirm('이미 추가된 상품 입니다. 추가 하시겠습니까?') == false) {
        //         return
        //     }
        //     count = addedItem.count + 1
        // }

        //장바구니 등록
        const selectCartList = choicePdInfoList.map((list) => {
            return {
                userId: list.userId,
                pdNo: list.pdNo,
                size: list.size,
                color: list.color,
                count: list.count
            }
        })

        const formData = new FormData()
        const jsonCart = JSON.stringify(selectCartList)
        const cartItemDTO = new Blob([jsonCart], { type: 'application/json' })

        formData.append("cartItemDTO", cartItemDTO)

        changeCart(formData)
        navigate({ pathname: '/user/cartPage' }, { replace: true })

    }

    const closeModal = () => {
        pageList()
    }

    const plusMinuceButton =
        "flex h-6 w-6 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

    return (
        <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Link to={`/brand/${pdInfo.brandNo}`}>
                <p className="mt-5 pl-6 py-2 text-3xl font-bold text-white bg-black">{brand.engNm}</p>
            </Link>
            <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
                {/* image gallery */}
                <div className="container px-3">
                    <img src={`${host}/product/view/${pdInfo.imageList[0]}`} />
                    {/* /image gallery  */}
                </div>
                {/* description  */}
                <div className="px-5 lg:px-5 ">
                    <h2 className="pt-3 text-3xl font-bold lg:pt-0">
                        {pdInfo.pdName}
                    </h2>
                    {/* 브랜드 */}
                    <div className="grid grid-cols-5 gap-1">
                        <div>
                            <p className="mt-5 font-bold"> 브랜드 </p>
                        </div>
                        <div className='col-span-4'>
                            <Link to={`/brand/${pdInfo.brandNo}`}>
                                <p className="mt-5 font-bold text-black">{brand.engNm}({pdInfo.brandNm})</p>
                            </Link>
                        </div>
                    </div>
                    {/* 성별 */}
                    <div className="grid grid-cols-5 gap-1">
                        <div>
                            <p className="mt-5 font-bold"> 성별 </p>
                        </div>
                        <div className='col-span-4'>
                            <p className="mt-5 font-bold text-gray-700"> {pdInfo.sexCd} </p>
                        </div>
                    </div>
                    {/* 좋아요 */}
                    <div className="grid grid-cols-5 gap-1">
                        <div>
                            <p className="mt-5 font-bold"> 좋아요 </p>
                        </div>
                        <div className='col-span-4'>
                            <p className="mt-5 font-bold text-gray-700"> {pdInfo.likeCnt} </p>
                        </div>
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
                            {changeSizeList.map((size, index) => {
                                return (
                                    <div
                                        id='size'
                                        name='size'
                                        key={index}
                                        onClick={() => handleSize(`${size.sizeType}`, index)}
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-800"
                                    >
                                        {size.sizeType}
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    {/* 색상 */}
                    <div className="mt-6">
                        <p className="pb-2 text-xs text-gray-500">색  상</p>
                        <div className="flex gap-1">
                            {changeColorList.map((size, index) => {
                                return (
                                    <div
                                        key={index}
                                        id='color'
                                        name='color'
                                        onClick={() => { handleColor(`${size.color}`, index) }}
                                        //className={`h-10 w-10 cursor-pointer border border-white bg-${size.colorCode} focus:ring-2 focus:ring-${size.colorCode} active:ring-2 active:ring-${size.colorCode}`}
                                        className="flex h-10 w-16 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-800"
                                    >
                                        {size.color}
                                    </div>

                                );
                            })}
                        </div>
                    </div>
                    {/* 수량 */}
                    <div className="mt-6 mb-8">
                        {
                            choicePdInfoList.length > 0 ?
                                <div>
                                    <p className="pb-2 text-xs text-gray-500">수  량</p>
                                    <div className="flex">
                                        <div>
                                            {choicePdInfoList.map((list, i) => (
                                                <div className='grid grid-cols-10'
                                                    key={i}>
                                                    <p className='cursor-text items-center justify-center col-span-6' >
                                                        {list.size} / {list.color}
                                                    </p>
                                                    <button className={`${plusMinuceButton}`} onClick={() => { setAmount((prev) => prev - 1); handleMinusCount(i) }}>−</button>
                                                    <p className="flex h-6 w-6 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                                        {list.count}
                                                    </p>
                                                    <button className={`${plusMinuceButton}`} onClick={() => { setAmount((prev) => prev + 1); handlePlusCount(i) }}> +</button>
                                                    <button className="flex h-6 w-6 ml-2 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                                        onClick={() => handleRemoveList(`${list.no}`)}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }

                    </div>
                    {/* <div className="mt-7 flex flex-row items-center gap-6"> */}

                    {userRoleNm !== 'BRAND_MANAGER' ?
                        <div className="grid grid-cols-1">
                            <button
                                onClick={() => handleAddCart()}
                                className="flex h-12 mb-5 items-center justify-center bg-gray-900 text-white duration-100">
                                <BiShoppingBag className="mx-2" />
                                Add to cart
                            </button>
                            <button className="flex h-12 mb-5 items-center justify-center bg-gray-100 duration-100">
                                <AiOutlineHeart className="mx-2" />
                                Wishlist
                            </button>
                        </div>
                        : <></>}

                    {brandAdmin === pdInfo.brandNo ?
                        <div className="grid grid-cols-1">
                            <button
                                onClick={() => modifyPage(pdInfo)}
                                className="flex h-12 mb-5 items-center justify-center bg-gray-900 text-white duration-100">
                                <AiOutlineHighlight className="mx-2" />
                                수  정
                            </button>
                            <button
                                onClick={handleClickRemove}
                                className="flex h-12 mb-5 items-center justify-center bg-gray-100 duration-100 ">
                                <AiTwotoneDelete className="mx-2" />
                                삭  제
                            </button>
                        </div>
                        : <></>}
                </div>
            </section>

            <span className=' text-gray-700 font-semibold  '>Info</span>

            <div className='w-full justify-center flex flex-col m-auto items-center'>

                <PdInfoSizeComponent sizeList={pdInfo.sizeList} categoryNo={pdInfo.categoryNo} />

                {pdInfo.imageList.map((fileNm, i) =>
                    <img src={`${host}/product/view/${fileNm}`}
                        alt="pdInfo"
                        key={i}
                    />
                )}
            </div>
        </div>


    );
}

export default PdInfoByIdComponent;
