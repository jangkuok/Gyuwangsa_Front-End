import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import CartComponent from '../../components/cart/CartComponent';

function CartPage(props) {
    return (
        <div>
            <BasicLayout>
                <CartComponent/>
            </BasicLayout>
        </div>
    );
}

export default CartPage;