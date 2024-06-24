import React, { useEffect, useRef, useState } from 'react';
import { API_SERVER_HOST, modifyPdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import { PhotoIcon } from '@heroicons/react/24/solid';
import PageCustomMove from '../../hocks/pageCustomMove';
import ResultModal from '../common/ResultModal';
import SizeComponet from '../common/SizeComponet';
import SizeInfoComponet from '../common/SizeInfoComponet';


export const host = API_SERVER_HOST


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
    delFlag: false,
    note: '',
    files: [],
    imageList: [],
    sizeList: []
}

function PdInfoModifyComponent({ pdNo }) {

    const [pdInfo, setPdInfo] = useState(initState)

    const [result, setResult] = useState(null)

    const uploadRef = useRef()

    const { movePagePdInfo } = PageCustomMove()

    const [addSizeList, setAddSizeList] = useState([])


    useEffect(() => {
        selectPdInfoByPdNo(pdNo).then(data => {
            setPdInfo(data)
            setAddSizeList([...data.sizeList])
        })
    }, [pdNo])

    const handleChangePdInfo = (e) => {
        pdInfo[e.target.name] = e.target.value
        setPdInfo({ ...pdInfo })

    }



    //이미지 삭제
    const deleteOldImageName = (imageName) => {
        const resultFileName = pdInfo.imageList.filter(fileNm => fileNm !== imageName)
        pdInfo.imageList = resultFileName
        setPdInfo({ ...pdInfo })

    }

    //사이즈 삭제
    const deleteSizeList = (type) => {
        const resultSizeList = addSizeList.filter(addSizeList => addSizeList.sizeType !== type)
        setAddSizeList(resultSizeList)
    }

    //사이즈 정보 주입
    const addSize = (s) => {
        setAddSizeList([...addSizeList, s])
    }

    const handleClickModify = () => {

        const formData = new FormData()
        const addfiles = uploadRef.current.files
        for (let i = 0; i < addfiles.length; i++) {
            formData.append("fileList", addfiles[i])
        }

        pdInfo.sizeList = addSizeList

        const jsonPdInfo = JSON.stringify(pdInfo)

        const pdInfoDTO = new Blob([jsonPdInfo], { type: 'application/json' })

        formData.append("pdInfo", pdInfoDTO)

        modifyPdInfo(formData, pdNo).then(data => {
            setResult("상품이 수정 되었습니다.")
        })
    }

    const closeModal = () => {
        movePagePdInfo(pdNo)
    }

    const textClass = 'block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
    const selectClass = 'block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'

    return (
        <div>
            <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">상품 등록</label>
                    {/* <h2 className="text-base font-semibold leading-7 text-gray-900">상품 등록</h2> */}
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* 브랜드 */}
                        <div className="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-900">
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

                        {/* 삼품이름 */}
                        <div className="sm:col-span-2 sm:col-start-1">
                            <label className="text-base text-gray-500 font-semibold mb-2 block">
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
                            <label className="text-base text-gray-500 font-semibold mb-2 block">
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
                            <label className="text-base text-gray-500 font-semibold mb-2 block">
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
                    <div>
                        <SizeInfoComponet categoryNo={`${pdInfo.categoryNo}`} addSizeList={addSizeList} deleteSizeList={deleteSizeList} />
                    </div>
                    {/* 사이드 등록  */}
                    <SizeComponet categoryNo={`${pdInfo.categoryNo}`} addSize={addSize} />
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

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label className="text-base text-gray-500 font-semibold mb-2 block">
                            이미지
                        </label>
                        <div className='w-4/5 justify-center flex flex-wrap items-start'>
                            {pdInfo.imageList.map((fileNm, i) =>
                                <div className='flex justify-center flex-col w-1/3 m-1 align-baseline'
                                    key={i}>
                                    <button
                                        onClick={() => deleteOldImageName(fileNm)}
                                        className='bg-gray-900 text-3xl text-white'>삭제</button>
                                    <img
                                        src={`${host}/product/view/${fileNm}`}
                                        alt="pdInfo"
                                        key={i}
                                    />
                                </div>
                            )}
                        </div>
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
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleClickModify}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Save
                    </button>
                </div>
            </div>



            {/* 성공 모달 */}
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal} /> : <></>}

        </div>
    );
}

export default PdInfoModifyComponent;