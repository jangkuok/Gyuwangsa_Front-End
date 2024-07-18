import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { host } from "../components/pdInfo/PdInfoListComponent";
import { selectBrandByKeyword } from "../api/brandApi";
import { selectPdInfoByKeyword } from "../api/pdInfoApi";
import UserCustomLogin from "../hocks/userCustomLogin";

const initStatePdInfoList = {
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

const initStateBrandList = {
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

function HeaderNavbarButton(props) {

  const [searchQuery, setSearchQuery] = useState('')
  const [pdInfoList, setPdInfoList] = useState(initStatePdInfoList)
  const [brandList, setBrandList] = useState(initStateBrandList)

  const navigate = useNavigate()

  const { loginState } = UserCustomLogin()
  const userId = loginState.userId

  useEffect(() => {
    if (searchQuery !== '') {
      selectBrandByKeyword(searchQuery.toUpperCase()).then((data) => {
        setBrandList(data)
      })

      selectPdInfoByKeyword(searchQuery, 1, 10, userId).then((data) => {
        setPdInfoList(data)
      })
    }
  }, [searchQuery])


  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      if (searchQuery === '') {
        window.confirm('키워드 작성이 필요합니다.')
        return
      }
      navigate({ pathname: `/product/search/${searchQuery}` })
      window.location.reload()
    }
  }


  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="relative w-full lg:w-[300px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              onKeyDown={(e) => activeEnter(e)}
              placeholder="Search your products here"
            />
            <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer rounded-l" />
            {searchQuery && (
              <div className={`w-full mx-auto h-72 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide`}>

                {brandList.dtoList.length !== 0 ?
                  <div>
                    <p className="ml-3 mb-1 mt-1 font-semibold text-gray-600">
                      Brand
                    </p>
                    {
                      brandList.totalCount >= 10 ?
                        <div>
                          <Link to={`/brand/search/${searchQuery}`}>
                            <p className="max-w text-xs text-gray-600 text-center mb-3 cursor-pointer ">
                              브랜드 더보기
                            </p>
                          </Link>
                        </div>
                        : <></>
                    }
                    {searchQuery && brandList.dtoList.map((brand, i) => (
                      <Link to={`/brand/${brand.brandNo}`} key={i}>
                        <div className="max-w h-28 bg-gray-100 mb-3 flex items-center gap-3 cursor-pointer">
                          <img className="w-16" src={`${host}/brand/view/${brand.brandLog}`} alt="brandLog" />
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-lg">
                              {brand.engNm}
                            </p>
                            <p className="text-xs text-gray-600">
                              {brand.brandNm}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  : <></>
                }
                {pdInfoList.dtoList.length !== 0 ?
                  <div>
                    <p className="ml-3 mb-1 mt-1 font-semibold text-gray-600">
                      Product
                    </p>
                    {
                      pdInfoList.totalCount >= 10 ?
                        <div>
                          <Link to={`/product/search/${searchQuery}`}>
                            <p className="max-w text-xs text-gray-600 text-center mb-3 cursor-pointer ">
                              상품 더보기
                            </p>
                          </Link>
                        </div>
                        : <></>
                    }
                    {searchQuery && pdInfoList.dtoList.map((pdInfo, i) => (
                      <Link to={`/product/info/${pdInfo.pdNo}`} key={i}>
                        <div className="max-w h-28 bg-gray-50 mb-3 flex items-center gap-3">
                          <img className="w-16" src={`${host}/product/view/${pdInfo.imageList[0]}`} alt="brandLog" />
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-lg">
                              {pdInfo.pdName}
                            </p>
                            <p className="text-xs text-gray-600">
                              [{pdInfo.brandNm}]
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  : <></>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbarButton;