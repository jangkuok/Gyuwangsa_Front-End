import React, { useState } from 'react';
function SizeInfoModifyComponet({ categoryNo, addSizeList, handleChangeSize, deleteSizeList, setModify, modify }) {

    const textClass = 'block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center'
    const buttonClass = 'block w-1/2 p-2 h-10 min-w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 text-center'

    return (
        <div>
            {addSizeList && addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '1') || Object.is(`${categoryNo}`, '3') ?
                    <div className='grid grid-cols-1 mb-2' key={i}>
                        {modify === i ?
                            <div>
                                <div className="grid grid-cols-8 gap-1">
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
                                        value={'색  상'}
                                        readOnly />
                                    <input type='text' className={`${textClass}`}
                                        value={'수  량'}
                                        readOnly />
                                </div>
                                <div className="grid grid-cols-8 gap-1">
                                    <input
                                        type='text'
                                        id='sizeTpye'
                                        name='sizeTpye'
                                        value={size.sizeType}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
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
                                        id='color'
                                        name='color'
                                        value={size.color}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
                                    <input
                                        type='text'
                                        id='sizeCnt'
                                        name='sizeCnt'
                                        value={size.sizeCnt}
                                        onChange={handleChangeSize}
                                        className={`${textClass}`} />
                                    <button
                                        className={`${buttonClass}`} onClick={() => { setModify(() => -1) }}>
                                        등록</button>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-10 mb-2 '>
                                <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-6' >
                                    {size.sizeType} /
                                    총  장 : {size.attr1} /
                                    어깨너비 : {size.attr2} /
                                    가슴단면 : {size.attr3} /
                                    소매길이 : {size.attr4} /
                                    색  상 : {size.color} /
                                    수  량 : {size.sizeCnt}
                                </p>
                                <button className="flex h-6 w-12 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    onClick={() => { setModify(() => i) }}>수 정</button>
                            </div>
                        }
                    </div>
                    : <></>
            )}

            {addSizeList && addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '2') ?
                    <div className='grid grid-cols-1 mb-2' key={i}>
                        {modify === i ?
                            <div>
                                <div className="grid grid-cols-10 gap-1">
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
                                        value={'색  상'}
                                        readOnly />
                                    <input type='text' className={`${textClass}`}
                                        value={'수  량'}
                                        readOnly />
                                </div>
                                <div className="grid grid-cols-10 gap-1">
                                    <input
                                        type='text'
                                        id='sizeTpye'
                                        name='sizeTpye'
                                        value={size.sizeType}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
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
                                        id='color'
                                        name='color'
                                        value={size.color}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
                                    <input
                                        type='text'
                                        id='sizeCnt'
                                        name='sizeCnt'
                                        value={size.sizeCnt}
                                        onChange={handleChangeSize}
                                        className={`${textClass}`} />
                                    <button
                                        className={`${buttonClass}`} onClick={() => { setModify(() => -1) }}>
                                        등록</button>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-10 mb-2 '>
                                <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-8' >
                                    {size.sizeType} /
                                    총  장 : {size.attr1} /
                                    허리 단면 : {size.attr2} /
                                    엉덩이 단면 : {size.attr3} /
                                    허벅지 단면 : {size.attr4} /
                                    밑  위 : {size.attr5} /
                                    밑단 단면 : {size.attr6} /
                                    색  상 : {size.color} /
                                    수  량 : {size.sizeCnt}
                                </p>
                                <button className="flex h-6 w-12 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    onClick={() => { setModify(() => i) }}>수 정</button>
                            </div>
                        }
                    </div>
                    : <></>
            )}

            {addSizeList && addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '4') ?
                    <div className='grid grid-cols-10 mb-2' key={i}>
                        <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-1' >
                            {size.sizeType} /
                            수  량 : {size.sizeCnt}
                        </p>
                        <button className="flex h-6 w-12cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                            onClick={() => { deleteSizeList(size.sizeType) }}>삭 제</button>
                    </div>

                    : <></>
            )}

            {addSizeList && addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '1') || Object.is(`${categoryNo}`, '3') ?
                    <div className='grid grid-cols-1 mb-2' key={i}>
                        {modify === i ?
                            <div>
                                <div className="grid grid-cols-4 gap-1">
                                    <input type='text' className={`${textClass}`}
                                        value={'사이즈'}
                                        readOnly />
                                    <input type='text' className={`${textClass}`}
                                        value={'색  상'}
                                        readOnly />
                                    <input type='text' className={`${textClass}`}
                                        value={'수  량'}
                                        readOnly />
                                </div>
                                <div className="grid grid-cols-8 gap-1">
                                    <input
                                        type='text'
                                        id='sizeTpye'
                                        name='sizeTpye'
                                        value={size.sizeType}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
                                    <input
                                        type='text'
                                        id='color'
                                        name='color'
                                        value={size.color}
                                        onChange={handleChangeSize}
                                        className='block w p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 text-center bg-gray-100'
                                        readOnly />
                                    <input
                                        type='text'
                                        id='sizeCnt'
                                        name='sizeCnt'
                                        value={size.sizeCnt}
                                        onChange={handleChangeSize}
                                        className={`${textClass}`} />
                                    <button
                                        className={`${buttonClass}`} onClick={() => { setModify(() => -1) }}>
                                        등록</button>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-4 mb-2 '>
                                <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-6' >
                                    {size.sizeType} /
                                    색  상 : {size.color} /
                                    수  량 : {size.sizeCnt}
                                </p>
                                <button className="flex h-6 w-12 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    onClick={() => { setModify(() => i) }}>수 정</button>
                            </div>
                        }
                    </div>
                    : <></>
            )}
        </div>
    );
}
export default SizeInfoModifyComponet;