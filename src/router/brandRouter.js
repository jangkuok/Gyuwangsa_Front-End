import React, { Suspense, lazy } from 'react';

const Loading = <div>Loading........</div>

const Brand = lazy(() => import("../pages/brand/BrandAddPage")) 

const BrandList = lazy(() => import("../pages/brand/BrandListPage")) 

const BrandPage = lazy(() => import("../pages/brand/BrandPage"))

const BrandModifyPage = lazy(() => import("../pages/brand/BrandModifyPage"))

const BrandOrderPage = lazy(() => import("../pages/brand/BrandOrderPage"))


function brandRouter(props) {
    return [
        {
            path: 'brand/brandAddPage',
            element: <Suspense fallback={Loading}><Brand/></Suspense>
        },
        {
            path: 'brand/brandList',
            element: <Suspense fallback={Loading}><BrandList/></Suspense>
        },
        {
            path: 'brand/:brandNo',
            element: <Suspense fallback={Loading}><BrandPage/></Suspense>
        },
        {
            path: 'brand/:brandNo/:categoryNo',
            element: <Suspense fallback={Loading}><BrandPage/></Suspense>
        },
        {
            path: 'brand/:brandNo/:categoryNo',
            element: <Suspense fallback={Loading}><BrandPage/></Suspense>
        },
        {
            path: 'brand/modifyPage/:brandNo',
            element: <Suspense fallback={Loading}><BrandModifyPage/></Suspense>
        },
        {
            path: 'brand/orderPage/:brandNo',
            element: <Suspense fallback={Loading}><BrandOrderPage/></Suspense>
        },


   ]
}

export default brandRouter;