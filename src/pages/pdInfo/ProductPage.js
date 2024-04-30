import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import PdInfoByIdComponent from '../../components/pdInfo/PdInfoByIdComponent';


function ProductPage() {

const {brandNo, categoryNo, itemNo, pdNo} = useParams()

    return (
        <BasicLayout>
            <PdInfoByIdComponent brandNo={brandNo}  categoryNo={categoryNo} itemNo={itemNo} pdNo={pdNo} />  
        </BasicLayout>
        
    );
}
export default ProductPage;