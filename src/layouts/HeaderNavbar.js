import React from "react";
import { Link } from "react-router-dom";
import HeaderNavbarButton from "./HeaderNavbarButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import UserCustomLogin from "../hocks/userCustomLogin";

function HeaderNavbar() {

  const loginState = useSelector(state => state.loginSlice)

  const { doLogout,moveToPath } = UserCustomLogin()

  const dispatch = useDispatch()

  const logoutButton = () => {
    doLogout()
  }


  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <img className="w-32 object-cover" src={'/public_assets/GWS_LOG.png'} />
            </div>
          </Link>
          {loginState.userId ?
            <div>
              <Link to="/user/myPage" className="text-white mr-3">
                마이페이지
              </Link>
              <Link to="/user/cartPage" className="text-white mr-3">
                장바구니
              </Link>
              <a onClick={logoutButton} className="text-white">로그아웃</a>
            </div>
            :
            <Link to="/loginPage" className="text-white mr-3">
              로그인
            </Link>
          }
        </div>
      </nav>
      <HeaderNavbarButton />
    </div>



  );
}
export default HeaderNavbar;