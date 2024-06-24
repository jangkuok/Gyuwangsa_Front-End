import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import PdInfoListComponent from '../../components/pdInfo/PdInfoListComponent';
import { useParams } from 'react-router-dom';


function ProductListPage() {
    
    const {categoryNo,itemNo} = useParams();
    return (
        <BasicLayout>
            <PdInfoListComponent categoryNo={categoryNo} itemNo={itemNo}/>
        </BasicLayout>
    );
}

export default ProductListPage;