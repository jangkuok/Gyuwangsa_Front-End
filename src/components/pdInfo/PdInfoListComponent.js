import React, { useEffect, useState } from 'react';
import PageCustomMove from '../../hocks/pageCustomMove';
import { API_SERVER_HOST, selectListByPdInfo } from '../../api/pdInfoApi';
import PageComponent from '../common/PageComponent';
import { useParams } from 'react-router-dom';
import FetchingModal from '../common/FetchingModal';

export const host = API_SERVER_HOST


const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

function PdInfoListComponent() {

  const { categoryNo, itemNo } = useParams()
  const [pdIndfoList, setPdInfoList] = useState(initState)
  const { page, size, pageList, refresh, movePagePdInfo } = PageCustomMove()
  const { fetching, setFetching } = useState(false)


  console.log("PdInfoListComponent")
  console.log(categoryNo, itemNo, page)

  useEffect(() => {
    //setFetching(true)
    selectListByPdInfo({ categoryNo, itemNo, page, size }).then(data => {
      //setFetching(false)
      setPdInfoList(data)

    })
  }, [categoryNo, itemNo, page, size, refresh])

  return (
    // <div className="w-full grid grid-cols-5 gap-5">
    //   {/* {fetching ? <FetchingModal/>:<></>} */}
    //   {pdIndfoList.dtoList.map((pdInfo) => (
    //     <div className="w-full relative group">
    //       <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
    //         <div onClick={() => movePagePdInfo(pdInfo.pdNo)}>
    //           <img className="w-full h-full" src={`${host}/product/view/s_${pdInfo.imageList[0]}`} />
    //         </div>
    //       </div>
    //       <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
    //         <div className="flex items-center justify-between font-titleFont">
    //           <h2 className="text-lg text-primeColor font-bold">
    //             {pdInfo.pdName}
    //           </h2>
    //           <p className="text-[#767676] text-[14px]">\{pdInfo.buyAmt}</p>
    //         </div>
    //         <div>
    //           <p className="text-[#767676] text-[14px]">샘플{pdInfo.pdNo}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    //   <div>
    //     <PageComponent pdIndfoList={pdIndfoList} movePage={pageList} categoryNo={categoryNo} itemNo={itemNo}/>
    //   </div>
    // </div>

    // <div className="bg-white">
    //   <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    //     <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-3">
    //       {/* {fetching ? <FetchingModal/>:<></>} */}
    //       {pdIndfoList.dtoList.map((pdInfo) => (
    //         <div className="w-full relative group">
    //           <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
    //             <div onClick={() => movePagePdInfo(pdInfo.pdNo)}>
    //               <img className="w-full h-full" src={`${host}/product/view/${pdInfo.imageList[0]}`} />
    //             </div>
    //           </div>
    //           <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
    //             <p className="text-[#767676] text-[14px]">{pdInfo.brandNm}</p>
    //             <div className="flex items-center justify-between font-titleFont">
    //               <h2 className="text-lg text-primeColor font-bold">
    //                 {pdInfo.pdName}
    //               </h2>
    //             </div>
    //             <div>
    //               <p className="text-[#767676] text-[14px]">\{pdInfo.buyAmt}</p>
    //               <p className="text-[#767676] text-[14px]">{pdInfo.likeCnt}</p>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div>
    //     <PageComponent pdIndfoList={pdIndfoList} movePage={pageList} categoryNo={categoryNo} itemNo={itemNo} />
    //   </div>

    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
        <h2 class="text-4xl font-extrabold text-gray-800 mb-12"></h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pdIndfoList.dtoList.map((pdInfo) => (
            <div class="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all">
              <div onClick={() => movePagePdInfo(pdInfo.pdNo)}
                class="w-full aspect-w-16 aspect-h-8 lg:h-80">
                <img src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="Product 1"
                  class="h-full w-full object-cover object-top" />
              </div>

              <div class="p-2">
                <p className="text-[#767676] text-[14px]">{pdInfo.brandNm}</p>
                <h3 class="text-lg font-bold text-gray-800">{pdInfo.pdName}</h3>
                <div class="mt-4 flex items-center flex-wrap gap-2">
                  <h4 class="text-lg font-bold text-gray-800">\{}{pdInfo.buyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>

                  <div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" class="fill-gray-800 inline-block"
                      viewBox="0 0 64 64">
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <PageComponent pdIndfoList={pdIndfoList} movePage={pageList} categoryNo={categoryNo} itemNo={itemNo} />
      </div>
    </div>



  );
}


export default PdInfoListComponent;
