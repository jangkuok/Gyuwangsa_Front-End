import React, { useEffect, useState } from 'react';
import { PhotoIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import ResultModal from '../common/ResultModal';
import { insertPdInfo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { useRef } from 'react';
import { selectListCategory, selectListItem } from '../../api/categoryApi';
import FetchingModal from '../common/FetchingModal';
import SizeComponet from '../common/SizeComponet';
import SizeInfoComponet from '../common/SizeInfoComponet';

const initState = {
    brandNo: 2,
    categoryNo: 1,
    itemNo: 1,
    pdNo: '',
    startDate: '',
    pdName: '',
    brandNm: '엘무드',
    endDate: '',
    buyAmt: 0,
    likeCnt: '',
    sexCd: '공용',
    delFlag: false,
    note: '',
    files: [],
    sizeList: []
}

function PdInfoInsertComponent() {

    const [pdInfo, setPdInfo] = useState(initState)

    const uploadRef = useRef()

    const [result, setResult] = useState(null)

    const [pdNo, setPdNo] = useState(null)

    const [categoryList, setCategoryList] = useState([])

    const [category, setCategory] = useState(null)

    const [fetching, setFetching] = useState(false)

    const { movePagePdInfo } = PageCustomMove()

    const { pageList } = PageCustomMove()

    // useEffect(() => {
    //     selectListCategory().then(data => {
    //         setCategoryList(data)
    //     })
    // }, [])

    //카테고리 리스트
    const handleCategoryList = () => {
        selectListCategory().then(data => {
            setCategoryList(data)
        })
    }

    const [itemList, setItemList] = useState([])

    //아이템 리스트
    const handleItemList = (categoryNo) => {
        if (categoryNo !== '선택하세요') {
            setCategory(categoryNo)
            setSizeList([])
            selectListItem(categoryNo).then(data => {
                setItemList(data)
            })
        }

    }

    //사이즈 정보 주입
    const [addSizeList, setSizeList] = useState([])

    const addSize = (s) => {
        setSizeList([...addSizeList, s])
    }

    //사이즈 삭제
    const deleteSizeList = (type) => {
        const resultSizeList = addSizeList.filter(addSizeList => addSizeList.sizeType !== type)
        setSizeList(resultSizeList)
    }


    //상품 정보 주입
    const handleChangePdInfo = (e) => {
        pdInfo[e.target.name] = e.target.value
        setPdInfo({ ...pdInfo })
    }

    //상품 등록
    const insertProduckButtonClick = () => {

        const formData = new FormData()
        const addfiles = uploadRef.current.files
        for (let i = 0; i < addfiles.length; i++) {
            formData.append("fileList", addfiles[i])
        }

        pdInfo.sizeList = addSizeList

        const jsonPdInfo = JSON.stringify(pdInfo)

        const pdInfoDTO = new Blob([jsonPdInfo], { type: 'application/json' })

        formData.append("pdInfo", pdInfoDTO)

        insertPdInfo(formData).then(data => {
            setFetching(false)
            setResult(data.pdNo)
            setPdNo(data.pdNo)
        })
    }

    //Modal
    const closeModal = () => {
        setResult(null)
        //movePagePdInfo(pdNo)
    }

    const textTpyeClass = 'text-base text-gray-500 font-semibold mb-2 block'
    const textClass = 'block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
    const selectClass = 'block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
    const plusMinuceButton =
        "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

    return (
        <div>
            <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <label class="text-base text-gray-500 font-semibold mb-2 block">상품 등록</label>
                    {/* <h2 className="text-base font-semibold leading-7 text-gray-900">상품 등록</h2> */}
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* 브랜드 */}
                        <div className="sm:col-span-2">
                            <label class={textTpyeClass}>
                                브랜드
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="brandNm"
                                    id="brandNm"
                                    //value={pdInfo.brandNm}
                                    value={'엘무드'}
                                    onChange={handleChangePdInfo}
                                    className='block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* 카테고리 */}
                        <div className="sm:col-span-2">
                            <label className={textTpyeClass}>
                                품  목
                            </label>
                            <div className="mt-2">
                                <select
                                    id="categoryNo"
                                    name="categoryNo"
                                    value={pdInfo.categoryNo}
                                    onChange={handleChangePdInfo}
                                    //onClick={() => handleItemList(pdInfo.categoryNo)}
                                    onClick={() => { handleCategoryList(); handleItemList(pdInfo.categoryNo) }}
                                    className={`${selectClass}`}
                                >
                                    <option value={"선택하세요"}>선택하세요</option>
                                    {categoryList.map((category) => (
                                        <option value={category.categoryNo} >{category.categoryNm}</option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        {/* 아이템 */}
                        <div className="sm:col-span-2">
                            <label className={textTpyeClass}>
                                종  류
                            </label>
                            <div className="mt-2">
                                <select
                                    id="itemNo"
                                    name="itemNo"
                                    //value={pdInfo.itemNo}
                                    value={pdInfo.itemNo}
                                    onChange={handleChangePdInfo}
                                    className={`${selectClass}`}
                                >
                                    <option value={"선택하세요"}>선택하세요</option>
                                    {itemList.map((item) =>
                                        <option value={item.itemNo}>{item.itemNm}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* 삼품이름 */}
                        <div className="sm:col-span-2 sm:col-start-1">
                            <label className={textTpyeClass}>
                                상품 이름
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="pdName"
                                    id="pdName"
                                    value={pdInfo.pdName}
                                    onChange={handleChangePdInfo}
                                    className={`${textClass}`}
                                />
                            </div>
                        </div>

                        {/* 가격 */}
                        <div className="sm:col-span-2">
                            <label className={textTpyeClass}>
                                가  격
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="buyAmt"
                                    id="buyAmt"
                                    value={pdInfo.buyAmt}
                                    onChange={handleChangePdInfo}
                                    className={`${textClass}`}
                                />
                            </div>
                        </div>

                        {/* 성별 */}
                        <div className="sm:col-span-2">
                            <label className={textTpyeClass}>
                                성  별
                            </label>
                            <div className="mt-2">
                                <select
                                    id="sexCd"
                                    name="sexCd"
                                    value={pdInfo.sexCd}
                                    onChange={handleChangePdInfo}
                                    className={`${selectClass}`}
                                >
                                    <option value={'공  용'}>공  용</option>
                                    <option value={'남'}>남</option>
                                    <option value={'여'}>여</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 사이즈 */}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label className="text-base text-gray-500 font-semibold mb-2 block">사이즈</label>
                    </div>

                    {/* 등록한 사이즈 */}
                    {addSizeList ?
                        <div>
                            <SizeInfoComponet categoryNo={`${pdInfo.categoryNo}`} addSizeList={addSizeList} deleteSizeList={deleteSizeList} />
                        </div>

                        : <></>}
                    {/* 사이드 등록 */}
                    <SizeComponet categoryNo={category} addSize={addSize} />
                </div>

                {/* 파일 업로드 */}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label className="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
                        <input
                            ref={uploadRef}
                            type="file"
                            multiple={true}
                            className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                        />
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </div>
                </div>

                {/* 상품 설명 */}
                <div className="col-span-full">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">
                        비  고
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="note"
                            name="note"
                            value={pdInfo.note}
                            onChange={handleChangePdInfo}
                            rows={6}
                            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>

                {/* 버튼 */}
                <div className={textTpyeClass}>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={insertProduckButtonClick}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Save
                    </button>
                </div>
            </div>



            {/* 로딩 */}
            {fetching ? <FetchingModal /> : <></>}

            {/* 성공 모달 */}
            {result ? <ResultModal
                content={`상품이 등록 되었습니다.`}
                callbackFn={closeModal}
            /> : <></>}
        </div>
    );
}

export default PdInfoInsertComponent;

