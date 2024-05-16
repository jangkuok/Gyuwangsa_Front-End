import React, { useEffect, useState } from 'react';
import { modifyPdInfo, selectPdInfoByPdNo } from '../../api/pdInfoApi';
import { PhotoIcon } from '@heroicons/react/24/solid';
import PageCustomMove from '../../hocks/pageCustomMove';
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

function PdInfoModifyComponent({ pdNo }) {

    const [pdInfo, setPdInfo] = useState(initState)

    const [result, setResult] = useState(null)

    const {movePagePdInfo} = PageCustomMove()

    useEffect(() => {

        selectPdInfoByPdNo(pdNo).then(data => {
            setPdInfo(data)
        })

    }, [pdNo])

    const handleChangePdInfo = (e) => {
        pdInfo[e.target.name] = e.target.value
        setPdInfo({ ...pdInfo })
    }

    const handleClickModify = () => {
        modifyPdInfo(pdInfo).then(data =>{
            setResult("상품이 수정 되었습니다.")
        })
    }

    const closeModal = () =>{
        movePagePdInfo(pdNo)
    }

    return (
        <div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">상품 수정</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="brandNo" className="block text-sm font-medium leading-6 text-gray-900">
                                브랜드
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="brandNo"
                                    id="pdNpdInfoame"
                                    value={pdInfo.brandNo}
                                    onChange={handleChangePdInfo}
                                    className=" block w-4/5 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6  bg-gray-100"
                                    readOnly
                                />

                            </div>
                        </div>

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
                                    className="block w-4/5 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

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
                                    className="block w-4/5 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="sexCd" className="block text-sm font-medium leading-6 text-gray-900">
                                성별
                            </label>
                            <div className="mt-2">
                                <select
                                    id="sexCd"
                                    name="sexCd"
                                    value={pdInfo.sexCd}
                                    onChange={handleChangePdInfo}
                                    className="block w-4/5 p-2 h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value={'공용'}>공용</option>
                                    <option value={'남'}>남</option>
                                    <option value={'여'}>여</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label htmlFor="pdImage" className="block text-sm font-medium leading-6 text-gray-900">
                            상품 이미지
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="pdImage"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 hover:text-gray-900"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="pdImage"
                                            name="pdImage"
                                            type="file"
                                            //value={pdInfo.pdImage}
                                            onChange={handleChangePdInfo}
                                            className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
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
                            className="block w-4/5 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>

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
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}/> : <></>}
        </div>
    );
}

export default PdInfoModifyComponent;