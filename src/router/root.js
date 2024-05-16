//코드스플리팅 사용해서 로딩을 빠르게 한다(필요할때까지 로딩X)
import {Suspense, lazy} from "react";
import productRouter from "./productRouter";
const {createBrowserRouter} = require("react-router-dom")

const Loading = <div>Loading........</div>
const Main = lazy(() => import("../pages/MainPage"))

const About = lazy(() => import("../pages/AboutPage"))

const Item = lazy(() => import("../pages/categories/ItemPage"))


const root = createBrowserRouter([
    {
        path: '',
        element:<Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: 'about',
        element:<Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: 'categories/item',
        element:<Suspense fallback={Loading}><Item/></Suspense>
    },
    {
        children:productRouter()
    },

])
export default root