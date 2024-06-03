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
    selectListByPdInfo({categoryNo,itemNo, page, size }).then(data => {
      //setFetching(false)
      setPdInfoList(data)

    })
  }, [categoryNo, itemNo, page, size, refresh])

  return (
    //   <div className="bg-white">
    //   <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    //     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //       {pdIndfoList.dtoList.map((pdInfo) => (
    //         <div className="group"

    //              onClick={()=> movePagePdInfo(pdInfo)}>
    //           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
    //             <img
    //               src={`/public_assets/sample_Img.jpg`}
    //               className="h-full w-full object-cover object-center group-hover:opacity-75"
    //             />
    //           </div>
    //           <h3 className="mt-4 text-sm text-gray-700 font-bold" ></h3>
    //           <h2 className="mt-4 text-sm text-gray-700">{pdInfo.pdName}</h2>
    //           <p className="mt-1 text-lg font-medium text-gray-900">{pdInfo.buyAmt}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <PageComponent pdIndfoList={pdIndfoList} movePage={pageList}/>
    // </div>

    // <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
    //   {pdIndfoList.dtoList.map((pdInfo) => (
    //     <div key={pdInfo.pdNo} onClick={() => movePagePdInfo(pdInfo)}>
    //       <img
    //         src={`/public_assets/sample_Img.jpg`}
    //         className="mx-auto w-full hover:scale-105 transition-all duration-300"
    //       />
    //       <div className="mt-4 px-4">
    //         <h4 className="text-base font-semibold mb-2">{pdInfo.pdName}</h4>

    //         <div className="flex justify-between">
    //           <p className="text-black/50">샘플</p>
    //           <p className="font-semibold">${pdInfo.buyAmt}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    //   <PageComponent pdIndfoList={pdIndfoList} movePage={pageList} />
    // </div>
    <div className="w-full grid grid-cols-5 gap-5">
      {/* {fetching ? <FetchingModal/>:<></>} */}
      {pdIndfoList.dtoList.map((pdInfo) => (
        <div className="w-full relative group">
          <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
            <div onClick={() => movePagePdInfo(pdInfo.pdNo)}>
              <img className="w-full h-full" src={`${host}/product/view/s_${pdInfo.imageList[0]}`} />
            </div>
            {/* <div className="absolute top-6 left-8">
              {props.badge && <Badge text="New" />}
            </div> */}
            {/* <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
              <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Compare
                  <span>
                    <GiReturnArrow />
                  </span>
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: props._id,
                        name: props.productName,
                        quantity: 1,
                        image: props.img,
                        badge: props.badge,
                        price: props.price,
                        colors: props.color,
                      })
                    )
                  }
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                >
                  Add to Cart
                  <span>
                    <FaShoppingCart />
                  </span>
                </li>
                <li
                  onClick={handleProductDetails}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                >
                  View Details
                  <span className="text-lg">
                    <MdOutlineLabelImportant />
                  </span>
                </li>
                <li
                  onClick={handleWishList}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                >
                  Add to Wish List
                  <span>
                    <BsSuitHeartFill />
                  </span>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
            <div className="flex items-center justify-between font-titleFont">
              <h2 className="text-lg text-primeColor font-bold">
                {pdInfo.pdName}
              </h2>
              <p className="text-[#767676] text-[14px]">\{pdInfo.buyAmt}</p>
            </div>
            <div>
              <p className="text-[#767676] text-[14px]">샘플{pdInfo.pdNo}</p>
            </div>
          </div>
        </div>
      ))}
      <div>
        <PageComponent pdIndfoList={pdIndfoList} movePage={pageList} categoryNo={categoryNo} itemNo={itemNo}/>
      </div>
    </div>
  );
}


export default PdInfoListComponent;
