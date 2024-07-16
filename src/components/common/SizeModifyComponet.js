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

function SizeModifyComponet({ categoryNo, addSize, addSizeList, deleteSizeList }) {
    const [size, setSize] = useState({ ...initState });

    const [no, setNo] = useState(1)

    const handleChangeSize = (e) => {
        size[e.target.name] = e.target.value
        //size.no = no
        setSize({ ...size })
    }

    const handleSaveSize = (pdType) => {

        if (pdType=== '상의' || pdType=== '아웃터') {
            if (size.sizeType === '' || size.attr1 === '' || size.attr2 === '' || size.attr3 === '' || size.attr4 === '' || size.sizeCnt === '') {
                window.confirm('사이즈 정보를 입력하세요.')
                return
            }
        }

        if (pdType === '바지') {
            if (size.sizeType === '' || size.attr1 === '' || size.attr2 === '' || size.attr3 === '' || size.attr4 === '' || size.attr5 === '' || size.attr6 === '' || size.sizeCnt === '') {
                window.confirm('사이즈 정보를 입력하세요.')
                return
            }
        }

        if (pdType === '신발') {
            if (size.sizeType === '' || size.sizeCnt === '') {
                window.confirm('사이즈 정보를 입력하세요.')
                return
            }
        }

        size.pdType = pdType
        addSize(size)
        //setNo(no + 1)
        setSize({ ...initState })
    }

    const textClass = 'block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
    const selectClass = 'block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center'
    const buttonClass = 'block w-1/2 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center'
    return (
        <div>
            {/* 상의 */}
            {addSizeList.map}
            {Object.is(categoryNo, '1') ?
                <div>
                    <div className="grid grid-cols-7 gap-1">
                        <input type='text' className={`${textClass}`}
                            value={'사이즈'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'총  장 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'어깨 너비 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'가슴 단면 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'소매 길이 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'수  량'}
                            readOnly />
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        <select
                            id="sizeType"
                            name="sizeType"
                            value={size.sizeType}
                            onChange={handleChangeSize}
                            className={`${selectClass}`}
                        >
                            <option value={''}>선택하세요</option>
                            <option value={'S'}>S</option>
                            <option value={'M'}>M</option>
                            <option value={'L'}>L</option>
                            <option value={'XL'}>XL</option>
                            <option value={'FREE'}>FREE</option>
                        </select>
                        <input
                            type='text'
                            id='attr1'
                            name='attr1'
                            value={size.attr1}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr2'
                            name='attr2'
                            value={size.attr2}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr3'
                            name='attr3'
                            value={size.attr3}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr4'
                            name='attr4'
                            value={size.attr4}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />

                        <input
                            type='text'
                            id='sizeCnt'
                            name='sizeCnt'
                            value={size.sizeCnt}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <button
                            onClick={() => handleSaveSize('상의')}
                            className={`${buttonClass}`}>
                            등록</button>
                    </div>
                </div>
                : <></>
            }
            {/* 아웃터 */}
            {Object.is(categoryNo, '3') ?
                <div>
                    <div className="grid grid-cols-7 gap-1">
                        <input type='text' className={`${textClass}`}
                            value={'사이즈'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'총  장 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'어깨 너비 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'가슴 단면 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'소매 길이 (mm)'}
                            readOnly />
                        <input type='text' className={`${textClass}`}
                            value={'수  량'}
                            readOnly />
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        <select
                            id="sizeType"
                            name="sizeType"
                            value={size.sizeType}
                            onChange={handleChangeSize}
                            className={`${selectClass}`}
                        >
                            <option value={''}>선택하세요</option>
                            <option value={'S'}>S</option>
                            <option value={'M'}>M</option>
                            <option value={'L'}>L</option>
                            <option value={'XL'}>XL</option>
                            <option value={'FREE'}>FREE</option>
                        </select>
                        <input
                            type='text'
                            id='attr1'
                            name='attr1'
                            value={size.attr1}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr2'
                            name='attr2'
                            value={size.attr2}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr3'
                            name='attr3'
                            value={size.attr3}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <input
                            type='text'
                            id='attr4'
                            name='attr4'
                            value={size.attr4}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />

                        <input
                            type='text'
                            id='sizeCnt'
                            name='sizeCnt'
                            value={size.sizeCnt}
                            onChange={handleChangeSize}
                            className={`${textClass}`} />
                        <button
                            onClick={() => handleSaveSize('아웃터')}
                            className={`${buttonClass}`}>
                            등록</button>
                    </div>
                </div>
                : <></>
            }
            {/* 하의 */}
            {
                Object.is(categoryNo, '2') ?
                    <div>
                        <div className="grid grid-cols-9 gap-1">
                            <input type='text' className={`${textClass}`}
                                value={'사이즈'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'총  장'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'허리 단면'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'엉덩이 단면'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'허벅지 단면'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'밑   위'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'밑단 단면'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'수  량'}
                                readOnly />
                        </div>
                        <div className="grid grid-cols-9 gap-1">
                            <select
                                id="sizeType"
                                name="sizeType"
                                value={size.sizeType}
                                onChange={handleChangeSize}
                                className={`${selectClass}`}
                            >
                                <option value={''}>선택하세요</option>
                                <option value={'S'}>S</option>
                                <option value={'M'}>M</option>
                                <option value={'L'}>L</option>
                                <option value={'XL'}>XL</option>
                                <option value={'FREE'}>FREE</option>
                            </select>
                            <input
                                type='text'
                                id='attr1'
                                name='attr1'
                                value={size.attr1}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='attr2'
                                name='attr2'
                                value={size.attr2}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='attr3'
                                name='attr3'
                                value={size.attr3}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='attr4'
                                name='attr4'
                                value={size.attr4}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='attr5'
                                name='attr5'
                                value={size.attr5}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='attr6'
                                name='attr6'
                                value={size.attr6}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <input
                                type='text'
                                id='sizeCnt'
                                name='sizeCnt'
                                value={size.sizeCnt}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <button
                                onClick={() => handleSaveSize('하의')}
                                className={`${buttonClass}`}>
                                등록</button>
                        </div>
                    </div>
                    : <></>
            }
            {/* 신발 */}
            {
                Object.is(categoryNo, '4') ?
                    <div>
                        <div className="grid grid-cols-9 gap-1">
                            <input type='text' className={`${textClass}`}
                                value={'사이즈'}
                                readOnly />
                            <input type='text' className={`${textClass}`}
                                value={'수  량'}
                                readOnly />
                        </div>
                        <div className="grid grid-cols-9 gap-1">
                            <input
                                type='text'
                                id="sizeType"
                                name="sizeType"
                                value={size.sizeType}
                                onChange={handleChangeSize}
                                className={`${selectClass}`} />
                            <input
                                type='text'
                                id='sizeCnt'
                                name='sizeCnt'
                                value={size.sizeCnt}
                                onChange={handleChangeSize}
                                className={`${textClass}`} />
                            <button
                                onClick={() => handleSaveSize('신발')}
                                className={`${buttonClass}`}>
                                등록</button>
                        </div>
                    </div>
                    : <></>
            }
        </div >
    );
}

export default SizeModifyComponet;