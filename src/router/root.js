//코드스플리팅 사용해서 로딩을 빠르게 한다(필요할때까지 로딩X)
import {Suspense, lazy} from "react";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
const {createBrowserRouter} = require("react-router-dom")

const Loading = <div>Loading........</div>
const Main = lazy(() => import("../pages/MainPage"))

const root = createBrowserRouter([
    {
        path: '',
        element:<Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        children:productRouter()
    },
    {
        children:userRouter()
    },

])
export default root