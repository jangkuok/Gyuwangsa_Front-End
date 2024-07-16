import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import PdInfoByIdComponent from '../../components/pdInfo/PdInfoByIdComponent';


function ProductPage() {
const {pdNo} = useParams()
    return (
        <BasicLayout>
            <PdInfoByIdComponent pdNo={pdNo}/>  
        </BasicLayout>
        
    );
}
export default ProductPage;