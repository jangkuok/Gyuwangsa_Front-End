import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import BrandListPageComponent from '../../components/brand/BrandListPageComponent';

function BrandListPage(props) {
    return (
        <BasicLayout>
            <BrandListPageComponent/>
        </BasicLayout>
    );
}

export default BrandListPage;