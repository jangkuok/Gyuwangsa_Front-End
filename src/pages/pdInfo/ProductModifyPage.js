import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import PdInfoModifyComponent from '../../components/pdInfo/PdInfoModifyComponent';
import { useParams } from 'react-router-dom';

function ProductModifyPage() {

    const {pdNo} = useParams()

    return (
        <BasicLayout>
            <PdInfoModifyComponent pdNo={pdNo}/>
        </BasicLayout>
    );
}

export default ProductModifyPage;