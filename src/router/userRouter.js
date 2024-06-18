import {Suspense, lazy} from "react";

const Loading = <div>Loading........</div>

const LoginPage = lazy(() => import("../pages/user/LoginPage"))
const MyPage = lazy(() => import("../pages/user/MyPage"))


const userRouter = () => {


    return [
        {
            path: 'loginPage',
            element:<Suspense fallback={Loading}><LoginPage/></Suspense>
        },
        {
            path: 'myPage',
            element:<Suspense fallback={Loading}><MyPage/></Suspense>
        },
   ]
}

export default userRouter