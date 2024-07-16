import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import BrandPageComponent from '../../components/brand/BrandPageComponent';
import { useParams } from 'react-router-dom';

function BrandPage(props) {

    const {brandNo} = useParams()
    return (
        <BasicLayout>
            <BrandPageComponent brandNo={brandNo}/>
        </BasicLayout>
    );
}

export default BrandPage;