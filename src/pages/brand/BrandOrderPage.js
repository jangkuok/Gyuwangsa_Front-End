import React from 'react';
import BrandOrderComponent from '../../components/brand/BrandOrderComponent';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';

function BrandOrderPage(props) {

    const {brandNo} = useParams()
    return (
        <BasicLayout>
            <BrandOrderComponent brandNo={brandNo}/>
        </BasicLayout>
    );
}

export default BrandOrderPage;