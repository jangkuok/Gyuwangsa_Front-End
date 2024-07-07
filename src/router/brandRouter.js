import React, { Suspense, lazy } from 'react';

const Loading = <div>Loading........</div>

const Brand = lazy(() => import("../pages/brand/BrandAddPage"))

function brandRouter(props) {
    return [
        {
            path: 'brand/brandAddPage',
            element: <Suspense fallback={Loading}><Brand/></Suspense>
        },
   ]
}

export default brandRouter;