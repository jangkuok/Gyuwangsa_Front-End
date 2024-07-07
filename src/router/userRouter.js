import {Suspense, lazy} from "react";

const Loading = <div>Loading........</div>

const LoginPage = lazy(() => import("../pages/user/LoginPage"))
const MyPage = lazy(() => import("../pages/user/MyPage"))
const KakaoRedirectPage = lazy(() => import("../pages/user/KakaoRedirectPage"))
const ModifyPage = lazy(() => import("../pages/user/UserModifyInfoPage"))
const UserJoinPage  = lazy(() => import("../pages/user/UserJoinPage"))
const CartPage  = lazy(() => import("../pages/cart/CartPage"))
const UserBrandSelectPage  = lazy(() => import("../pages/user/UserBrandSelectPage"))
const UserFindPage  = lazy(() => import("../pages/user/UserFindPage"))

const userRouter = () => {


    return [
        {
            path: 'loginPage',
            element:<Suspense fallback={Loading}><LoginPage/></Suspense>
        },
        {
            path: 'userJoinPage',
            element:<Suspense fallback={Loading}><UserJoinPage/></Suspense>
        },
        {
            path: 'user/myPage',
            element:<Suspense fallback={Loading}><MyPage/></Suspense>
        },
        {
            path: 'user/kakao',
            element:<Suspense fallback={Loading}><KakaoRedirectPage/></Suspense>
        },
        {
            path: 'user/modifyPage',
            element:<Suspense fallback={Loading}><ModifyPage/></Suspense>
        },
        {
            path: 'user/cartPage',
            element:<Suspense fallback={Loading}><CartPage/></Suspense>
        },
        {
            path: 'userBrandSelectPage',
            element:<Suspense fallback={Loading}><UserBrandSelectPage/></Suspense>
        },
        {
            path: 'userFindPage',
            element:<Suspense fallback={Loading}><UserFindPage/></Suspense>
        },
        
        

   ]
}

export default userRouter