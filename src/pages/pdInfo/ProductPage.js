import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import PdInfoByIdComponent from '../../components/pdInfo/PdInfoByIdComponent';


function ProductPage() {
const {pdNo} = useParams()
console.log("PD PAGE")
console.log(pdNo)
    return (
        <BasicLayout>
            <PdInfoByIdComponent pdNo={pdNo}/>  
        </BasicLayout>
        
    );
}
export default ProductPage;