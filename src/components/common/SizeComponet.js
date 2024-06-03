import { collapse, input } from '@material-tailwind/react';
import React, { useState } from 'react';

const initState = {
    //no: '0',
    sizeType: '',
    pdType: '',
    attr1: '',
    attr2: '',
    attr3: '',
    attr4: '',
    attr5: '',
    attr6: '',
    attr7: '',
    color: '',
    colorCode: '',
    sizeCnt: '',
}
function SizeComponet({category,addSize}) {

    const [size, setSize] = useState({ ...initState });

    //const [sizeList, setSizeList] = useState([])

    const [no, setNo] = useState(1)
    //사이즈 정보 주입
    // const handleChangeSize = (e) => {
    //     size[e.target.name] = e.target.value
    //     setSize({ ...size })
    //     setSizeList([size])
    // }

    // const handleSaveSize = () => {
    //     console.log(sizeList)
    // }

    const handleChangeSize = (e) => {
        size[e.target.name] = e.target.value
        //size.no = no
        setSize({...size})
    }


    // const handleSaveSize = () => {
    //     setNo(no + 1)
    //     console.log(no)
    //     setSizeList([...sizeList, size])
    //     setSize({...initState})
    //     console.log(setSizeList)
    // }


        const handleSaveSize = () => {
        addSize(size)
        //setNo(no + 1)
        setSize({...initState})
    }

    return (


        <div>
            {/* {Object.is(category,[1]) ? */}
                <div>
                    <div className="grid grid-cols-8 gap-1">
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'사이즈'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'총  장'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'어깨 너비'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'가슴 단면'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'소매 길이'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'색  상'}
                            readOnly />
                        <input type='text' className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
                            value={'수  량'}
                            readOnly />
                    </div>
                    <div className="grid grid-cols-8 gap-1">
                        <select
                            id="sizeType"
                            name="sizeType"
                            value={size.sizeType}
                            onChange={handleChangeSize}
                            className="block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center"
                        >
                            <option value={''}>선택하세요</option>
                            <option value={'S'}>S</option>
                            <option value={'M'}>M</option>
                            <option value={'L'}>L</option>
                            <option value={'XL'}>XL</option>
                        </select>
                        <input
                            type='text'
                            id='attr1'
                            name='attr1'
                            value={size.attr1}
                            onChange={handleChangeSize}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center' />
                        <input
                            type='text'
                            id='attr2'
                            name='attr2'
                            value={size.attr2}
                            onChange={handleChangeSize}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center' />
                        <input
                            type='text'
                            id='attr3'
                            name='attr3'
                            value={size.attr3}
                            onChange={handleChangeSize}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center' />
                        <input
                            type='text'
                            id='attr4'
                            name='attr4'
                            value={size.attr4}
                            onChange={handleChangeSize}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center' />
                        <select
                            id="color"
                            name="color"
                            value={size.color}
                            onChange={handleChangeSize}
                            className="block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center"
                        >
                            <option value={''}>선택하세요</option>
                            <option value={"네이비"}>네이비</option>
                        </select>
                        <input
                            type='text'
                            id='sizeCnt'
                            name='sizeCnt'
                            value={size.sizeCnt}
                            onChange={handleChangeSize}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center' />
                        <button
                            onClick={() => handleSaveSize()}
                            className='block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center'>
                            등록</button>
                        <input id='colorCode' name='colorCode' type='hidden' value={size.colorCode} onChange={handleChangeSize} />
                        <input id='pdType' name='pdType' type='hidden' value={size.pdType} onChange={handleChangeSize} />
                        <input id='colorCode' name='colorCode' type='hidden' value={size.colorCode} onChange={handleChangeSize} />
                    </div>
                </div>
                {/* : <></>} */}

        </div>
    );
}

export default SizeComponet;