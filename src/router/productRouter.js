import {Suspense, lazy} from "react";

const Loading = <div>Loading........</div>

const Product = lazy(() => import("../pages/pdInfo/ProductPage"))

const ProductModify = lazy(() => import("../pages/pdInfo/ProductModifyPage"))

const ProductInsert = lazy(() => import("../pages/pdInfo/ProductAddPage"))


const productRouter = () => {
    return [
        {
            path: 'product/:pdNo',
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
   ]
}

export default productRouter