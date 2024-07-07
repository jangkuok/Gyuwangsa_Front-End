import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import OrderComponent from '../../components/order/OrderComponent';

function OrderPage(props) {
    return (
        <BasicLayout>
            <OrderComponent/>
        </BasicLayout>
    );
}

export default OrderPage;