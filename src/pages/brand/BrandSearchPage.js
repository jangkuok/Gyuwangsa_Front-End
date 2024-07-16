import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import BrandSearchComponent from '../../components/brand/BrandSearchComponent';

function BrandSearchPage(props) {
    const { keyword } = useParams()
    return (
        <BasicLayout >
            <BrandSearchComponent keyword={keyword}/>
        </BasicLayout>
    );
}

export default BrandSearchPage;