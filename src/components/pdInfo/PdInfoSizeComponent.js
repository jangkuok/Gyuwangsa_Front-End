import React from 'react';

function PdInfoSizeComponent({ sizeList, categoryNo }) {

    const list = sizeList.map((size) => {
        return {
            sizeType: size.sizeType,
            attr1: size.attr1,
            attr2: size.attr2,
            attr3: size.attr3,
            attr4: size.attr4,
            attr5: size.attr5,
            attr6: size.attr6,
            attr7: size.attr7,
        }
    })
    const changeSizeList = [
        ...new Set(list.map((size) => JSON.stringify(size))),
    ].map((size) => JSON.parse(size))

    return (
        <div className="flex flex-col mb-14 mt-14">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    {
                        categoryNo === 1 || categoryNo === 3 ?
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-neutral-500">사이즈</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">총 장</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">어깨너비</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">가슴단면</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">소매길이</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-700">
                                        {changeSizeList && changeSizeList.map((size, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.sizeType}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr1}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr2}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr3}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr4}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            : <></>
                    }
                    {
                        categoryNo === 2 ?
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500 ">사이즈</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">총 장</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">허리 단면</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">엉덩이 단면</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">허벅지 단면</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">밑 위</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">밑단 단면</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-700">
                                        {changeSizeList && changeSizeList.map((size, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.sizeType}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr1}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr2}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr3}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr4}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr5}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.attr6}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            : <></>
                    }
                                        {
                        categoryNo === 4 ?
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-neutral-500">사이즈</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-700">
                                        {changeSizeList && changeSizeList.map((size, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{size.sizeType}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default PdInfoSizeComponent;