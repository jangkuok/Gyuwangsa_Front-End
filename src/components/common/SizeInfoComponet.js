import React, { useState } from 'react';



function SizeInfoComponet({ categoryNo, addSizeList, deleteSizeList }) {


    return (
        <div>
            {addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '1') || Object.is(`${categoryNo}`, '3') ?
                    <div className='grid grid-cols-10 mb-2' key={i}>
                        <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-5' >
                            {size.sizeType} /
                            총  장 : {size.attr1} /
                            어깨너비 : {size.attr2} /
                            가슴단면 : {size.attr3} /
                            소매길이 : {size.attr4} /
                            수  량 : {size.sizeCnt}
                        </p>
                        <button className="flex h-6 w-12 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                            onClick={() => { deleteSizeList(size.sizeType) }}>삭 제</button>
                    </div>
                    : <></>
            )}

            {addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '2') ?

                    <div className='grid grid-cols-10 mb-2' key={i}>
                        <p className='text-x text-gray-400 cursor-text items-center justify-center col-span-7' >
                            {size.sizeType} /
                            총  장 : {size.attr1} /
                            허리 단면 : {size.attr2} /
                            엉덩이 단면 : {size.attr3} /
                            허벅지 단면 : {size.attr4} /
                            밑  위 : {size.attr5} /
                            밑단 단면 : {size.attr6} /
                            수  량 : {size.sizeCnt}
                        </p>
                        <button className="flex h-6 w-12 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                            onClick={() => { deleteSizeList(size.sizeType) }}>삭 제</button>
                    </div>
                    : <></>
            )}

            {addSizeList.map((size, i) =>
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
        </div>
    );
}

export default SizeInfoComponet;