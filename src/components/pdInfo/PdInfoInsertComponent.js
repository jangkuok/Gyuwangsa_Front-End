import React, { useEffect, useState } from 'react';
import { PhotoIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import ResultModal from '../common/ResultModal';
import { insertPdInfo } from '../../api/pdInfoApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { useRef } from 'react';
import { selectListCategory, selectListItem } from '../../api/categoryApi';
import FetchingModal from '../common/FetchingModal';
import SizeComponet from '../common/SizeComponet';

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
    note: '',
    files:[],
    sizeList: []
}

const initStateItems = {
    itemNo: '',
    itemNm: ''

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

    //const [itemList, setItemList] = useState([initStateItems])
    const [itemList, setItemList] = useState([])

    //아이템 리스트
    const handleItemList = (categoryNo) => {
        setCategory(categoryNo)
        if (categoryNo !== '선택하세요') {
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
            //console.log(addfiles[i])
            formData.append("fileList", addfiles[i])
        }

        pdInfo.sizeList = addSizeList

        const jsonPdInfo = JSON.stringify(pdInfo)

        const pdInfoDTO = new Blob([jsonPdInfo], { type: 'application/json' })

        // const json = JSON.stringify(addSizeList)
        // pdInfo.sizeList = json
        // const pdInfoDTO = new Blob([pdInfo], { type: 'application/json' })
        // console.log(pdInfo)
        //const pdSize = new Blob([json], { type: 'application/json' })
        //formData.append("sizeList", JSON.stringify(sizeList))
        // for (let i = 0; i <= sizeList.length-1; i++) {
        //         formData.append("sizeList", JSON.stringify(sizeList[i]))
        //     }

        formData.append("pdInfo", pdInfoDTO)

        // formData.append("brandNo", pdInfo.brandNo)
        // formData.append("categoryNo", pdInfo.categoryNo)
        // formData.append("itemNo", pdInfo.itemNo)
        // formData.append("pdName", pdInfo.pdName)
        // formData.append("brandNm", pdInfo.brandNm)
        // formData.append("buyAmt", pdInfo.buyAmt)
        // formData.append("likeCnt", 0)
        // formData.append("sexCd", pdInfo.sexCd)
        // formData.append("note", pdInfo.note)

        //setFetching(true)

        // for (let key of formData.keys()) {
        //     console.log(key, ":", formData.get(key));
        // }


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

    return (
        <div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">상품 등록</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* 브랜드 */}
                        <div className="sm:col-span-2">
                            <label htmlFor="brandNo" className="block text-sm font-medium leading-6 text-gray-900">
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
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* 카테고리 */}
                        <div className="sm:col-span-2">
                            <label htmlFor="sexCdSelect" className="block text-sm font-medium leading-6 text-gray-900">
                                품목
                            </label>
                            <div className="mt-2">
                                <select
                                    id="categoryNo"
                                    name="categoryNo"
                                    value={pdInfo.categoryNo}
                                    onChange={handleChangePdInfo}
                                    //onClick={() => handleItemList(pdInfo.categoryNo)}
                                    onClick={() => { handleCategoryList(); handleItemList(pdInfo.categoryNo) }}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
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
                            <label htmlFor="brandNm" className="block text-sm font-medium leading-6 text-gray-900">
                                종류
                            </label>
                            <div className="mt-2">
                                <select
                                    id="itemNo"
                                    name="itemNo"
                                    //value={pdInfo.itemNo}
                                    value={pdInfo.itemNo}
                                    onChange={handleChangePdInfo}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                >
                                    <option value={"선택하세요"}>선택하세요</option>
                                    {itemList.map((item) =>
                                        <option value={item.itemNo}>{item.itemNm}</option>
                                    )}
                                </select>
                                {itemList.map((item) =>
                                    <input type='text' value={item.itemNo} />
                                )}
                            </div>
                        </div>

                        {/* 삼품이름 */}
                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="pdName" className="block text-sm font-medium leading-6 text-gray-900">
                                상품 이름
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="pdName"
                                    id="pdName"
                                    value={pdInfo.pdName}
                                    onChange={handleChangePdInfo}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 가격 */}
                        <div className="sm:col-span-2">
                            <label htmlFor="buyAmt" className="block text-sm font-medium leading-6 text-gray-900">
                                가격
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="buyAmt"
                                    id="buyAmt"
                                    value={pdInfo.buyAmt}
                                    onChange={handleChangePdInfo}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 성별 */}
                        <div className="sm:col-span-2">
                            <label htmlFor="sexCdSelect" className="block text-sm font-medium leading-6 text-gray-900">
                                성별
                            </label>
                            <div className="mt-2">
                                <select
                                    id="sexCd"
                                    name="sexCd"
                                    value={pdInfo.sexCd}
                                    onChange={handleChangePdInfo}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                >
                                    <option value={'공용'}>공용</option>
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
                        <label class="text-base text-gray-500 font-semibold mb-2 block">사이즈</label>
                    </div>

                    {/* 등록한 사이즈 */}
                    {addSizeList ? <div>{addSizeList.map((size) =>
                        <p>{size.sizeType}/{size.attr1}/{size.attr2}/{size.attr3}/{size.attr4}/{size.attr5}{size.color}/{size.sizeCnt}</p>
                    )}</div> : <></>}

                    {/* 사이드 등록 */}
                    <SizeComponet categoryNo={category} addSize={addSize} />
                </div>

                {/* 파일 업로드 */}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
                        <input
                            ref={uploadRef}
                            type="file"
                            multiple={true}
                            class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                        />
                        <p class="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </div>
                </div>

                {/* 상품 설명 */}
                <div className="col-span-full">
                    <label htmlFor="note" className="block text-sm font-medium leading-6 text-gray-900">
                        비고
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
            </div>

            {/* 버튼 */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
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

