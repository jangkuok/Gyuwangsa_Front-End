//카테고리 관한 router
import {Suspense, lazy} from "react";

const Loading = <div>Loading........</div>


const Product = lazy(() => import("../pages/categories/ProductPage"))

const productRouter = () => {
    return[
        {
            path: 'product/:tno',
            element: <Suspense fallback={Loading}><Product/></Suspense>
        }
    ]
}

export default productRouter;