import {Suspense, lazy} from "react";

const Loading = <div>Loading........</div>

const Product = lazy(() => import("../pages/pdInfo/ProductPage"))

const Item = lazy(() => import("../pages/categories/ProductListPage"))

const ProductModify = lazy(() => import("../pages/pdInfo/ProductModifyPage"))

const ProductInsert = lazy(() => import("../pages/pdInfo/ProductAddPage"))

const ProductSearchPage = lazy(() => import("../pages/pdInfo/ProductSearchPage"))


const productRouter = () => {


    return [
        {
            path: 'product/item/:categoryNo/:itemNo',
            element:<Suspense fallback={Loading}><Item/></Suspense>
        },
        {
            path: 'product/info/:pdNo',
            element: <Suspense fallback={Loading}><Product/></Suspense>
        },
        {
            path: 'product/modify/:pdNo',
            element: <Suspense fallback={Loading}><ProductModify/></Suspense>
        },
        {
            path: 'product/productAddPage',
            element: <Suspense fallback={Loading}><ProductInsert/></Suspense>
        },
        {
            path: 'product/search/:keyword',
            element: <Suspense fallback={Loading}><ProductSearchPage/></Suspense>
        },
   ]
}

export default productRouter
