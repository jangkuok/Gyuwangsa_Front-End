import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import BrandInsertComponent from '../../components/brand/BrandInsertComponent';

function BrandAddPage(props) {
    return (
        <BasicLayout>
            <BrandInsertComponent/>
        </BasicLayout>
    );
}

export default BrandAddPage;