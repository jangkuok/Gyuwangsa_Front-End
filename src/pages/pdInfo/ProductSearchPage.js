import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import PdInfoSearchListComponent from '../../components/pdInfo/PdInfoSearchListComponent';

function ProductSearchPage(props) {

    const { keyword } = useParams()
    return (
        <BasicLayout >
            <PdInfoSearchListComponent keyword={keyword} />
        </BasicLayout>
    );
}

export default ProductSearchPage;