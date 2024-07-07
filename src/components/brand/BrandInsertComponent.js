import React, { useRef, useState } from 'react';
import AddressPopModal from '../../hocks/addressPopModal';
import { insertBrand } from '../../api/brandApi';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const initState = {
    brandNo: '',
    brandNm: '',
    brandLog: '',
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



function BrandInsertComponent(props) {


    const [brand, setBrand] = useState(initState)

    const uploadRef = useRef()
    const navigate = useNavigate()

    // 주소 검색
    const [address, setAddress] = useState({
        address: '',
        zonecode: ''
    })

    const [popup, setPopup] = useState(false);

    const handleChangeBrand = (e) => {
        brand[e.target.name] = e.target.value
        setBrand({ ...brand })
    }

    const handleAddressButton = (data) => {
        setPopup(!popup)
    }


    //브랜드 등록
    const insertBrandButtonClick = () =>{

        brand.addr = address.address
        brand.addrNo = address.zonecode

        const formData = new FormData()

        const logFile = uploadRef.current.files[0]

        if(brand.brandNo === '' || brand.brandNm === '' || logFile === null || brand.addrNo === '' || brand.addr === '' || brand.addrDtl === '' || brand.comCall === '' || brand.comEmail === '' || brand.deliComp === ''){
            window.confirm('정보를 입력하세요.')
            return
        }

        formData.append("logFile", logFile)

        const jsonBrand = JSON.stringify(brand)

        const brandDTO = new Blob([jsonBrand], { type: 'application/json' })

        formData.append("brandDTO", brandDTO)

        console.log(brand)
        console.log(jsonBrand)
        console.log(logFile)
        
        //브랜드 등록
        insertBrand(formData).then(data => {
            const templateParams = {
                to_email: brand.comEmail,
                from_name : 'gyuwangsa@gmail.com',
                message: data.brandNo
            }
            
            emailjs

            .send(
                'service_9rpos4p', 
                'template_h24hx3c', 
                templateParams,
                'bWhte-PRj6bqA6KFp',
            )
            .then((response) => {
                console.log('이메일이 성공적으로 보내졌습니다:', response);
                window.confirm('이메일이 성공적으로 보내졌습니다')
                navigate({ pathname: '/' }, { replace:true})
            })
            .catch((error) => {
                console.error('이메일 보내기 실패:', error);
                window.confirm('등록 실패')
                return;
            })
        })
    }

    const textTpyeClass = 'text-base text-gray-500 font-semibold mb-2 block'

    return (
        <div>
            <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">브랜드 가입</label>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        {/* 브랜드 이름 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                브랜드 이름
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="brandNm"
                                id="brandNm"
                                onChange={handleChangeBrand}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>
                        {/* 회사 번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                회사 전화번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-2">
                                <input
                                    type="input"
                                    name="comCall"
                                    id="comCall"
                                    onChange={handleChangeBrand}
                                    className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* 이메일 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이 메 일
                            </label>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="comEmail"
                                    id="comEmail"
                                    onChange={handleChangeBrand}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 택배사 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                택 배 사
                            </label>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <select
                                    id="deliComp"
                                    name="deliComp"
                                    onChange={handleChangeBrand}
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                >
                                    <option value='선택하세요'>선택하세요</option>
                                    <option value='로젠택배'>로젠택배</option>
                                    <option value='CJ택배'>CJ택배</option>
                                    <option value='우체국택배'>우체국택배</option>
                                    <option value='한진택배'>한진택배</option>
                                    <option value='롯데백배'>롯데백배</option>
                                    <option value='GS편의점택배'>GS편의점택배</option>
                                    <option value='CU편의점택배'>CU편의점택배</option>

                                </select>
                            </div>
                        </div>

                        {/* 우편번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                우편번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="addrNo"
                                id="addrNo"
                                value={address.zonecode}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>

                        <div className="sm:col-span-1">
                            <button type="button"
                                onClick={handleAddressButton}
                                className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                검  색
                            </button>
                            {popup && <AddressPopModal company={address} setcompany={setAddress} />}
                        </div>

                        {/* 주소 */}

                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                주  소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addr"
                                id="addr"
                                value={address.address}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>
                        {/* 상세 주소 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                상세 주소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addrDtl"
                                id="addrDtl"
                                onChange={handleChangeBrand}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>

                    </div>
                </div>
                {/* 파일 업로드 */}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <label className="text-base text-gray-500 font-semibold mb-2 block">로고 등록</label>
                        <input
                            ref={uploadRef}
                            type="file"
                            multiple={false}
                            className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                        />
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button"
                        className="rounded-md bg-gray-400 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={insertBrandButtonClick}
                        className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandInsertComponent;