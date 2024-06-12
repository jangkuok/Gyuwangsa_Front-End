import React, { useState } from 'react';



function SizeInfoComponet({ categoryNo, addSizeList, deleteSizeList }) {


    return (
        <div>
            {addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '1') || Object.is(`${categoryNo}`, '3') ?
                    <div key={i}>
                        <p className='text-x text-gray-400 mt-2' key={i}>
                            {size.sizeType} /
                            총  장 : {size.attr1} /
                            어깨너비 : {size.attr2} /
                            가슴단면 : {size.attr3} /
                            소매길이 : {size.attr4} /
                            색  상 : {size.color} /
                            수  량 : {size.sizeCnt}
                        </p>
                        <button onClick={() => {deleteSizeList(size.sizeType)}}>x</button>
                    </div>
                    : <></>
            )}

            {addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '2') ?
                    <div>
                        <p className='text-x text-gray-400 mt-2' key={i}>
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
                        <button onClick={() => deleteSizeList(size.sizeType)}>x</button>
                    </div>
                    : <></>
            )}
            {addSizeList.map((size, i) =>
                Object.is(`${categoryNo}`, '4') ?
                    <div>
                        <p className='text-x text-gray-400 mt-2' key={i}>
                            {size.attr1} /
                            색  상 : {size.color} /
                            수  량 : {size.sizeCnt}
                        </p>
                        <button onClick={() => deleteSizeList(size.sizeType)}>x</button>
                    </div>
                    : <></>
            )}
        </div>
    );
}

export default SizeInfoComponet;