import React, { Suspense, lazy } from 'react';

const Loading = <div>Loading........</div>

const Order = lazy(() => import("../pages/order/OrderPage"))

function orderRouter(props) {
    return [
        {
            path: 'order/orderPage',
            element: <Suspense fallback={Loading}><Order/></Suspense>
        },
   ]
}

export default orderRouter;