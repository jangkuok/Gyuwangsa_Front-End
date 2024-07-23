import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderNavbarButton from "./HeaderNavbarButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import UserCustomLogin from "../hocks/userCustomLogin";
import { getCookie } from "../util/cookieUtil";

function HeaderNavbar() {

  const { doLogout } = UserCustomLogin()

  const navigate = useNavigate()

  const { loginState } = UserCustomLogin()

  const userRoleNm = loginState.roleNm

  const brandAdmin = loginState.brandCd



  const logoutButton = () => {
    doLogout()
  }


  const brandLink = (brandCd) => {
    navigate({ pathname: `/brand/${brandCd}` })
    window.location.reload()
  }


  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full w-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-between h-full w-full">
          <Link to="/">
            <div>
              <img className="w-32 object-cover" src={'/public_assets/GWS_LOG.png'} />
            </div>
          </Link>
          {loginState.userId ?
            <div>
              <Link to="/brand/brandList" className="text-white mr-3">
                브랜드
              </Link>
              {
                brandAdmin !== 0 ?
                  <Link to={''} className="text-white mr-3" onClick={() => { brandLink(brandAdmin); }}>
                    나의 브랜드
                  </Link>
                  :
                  <Link to="/user/myPage" className="text-white mr-3">
                    마이페이지
                  </Link>
              }
              {
                userRoleNm !== 'BRAND_MANAGER' ?
                  <Link to="/user/cartPage" className="text-white mr-3">
                    장바구니
                  </Link>
                  : <></>
              }

              <a onClick={logoutButton} className="text-white">로그아웃</a>
            </div>
            :
            <div>
              <Link to="/brand/brandAddPage" className="text-white mr-3">
                브랜드 가입
              </Link>
              <Link to="/brand/brandList" className="text-white mr-3">
                브랜드
              </Link>
              <Link to="/loginPage" className="text-white mr-3">
                로그인
              </Link>
            </div>
          }
        </div>
      </nav >
      <HeaderNavbarButton />
    </div >



  );
}
export default HeaderNavbar;