import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import BrandModifyComponent from '../../components/brand/BrandModifyComponent';
import { useParams } from 'react-router-dom';

function BrandModifyPage(props) {

    const {brandNo} = useParams()

    return (
        <BasicLayout>
            <BrandModifyComponent brandNo={brandNo}/>
        </BasicLayout>
    );
}

export default BrandModifyPage;