import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { selectPdInfoByPdNo } from '../../api/pdInfoApi';

const initState = {
    brandNo:'',
    categoryNo:'',
    itemNo:'',
    pdNo:'',
    startDate:'',
    pdName:'',
    endDate:'',
    buyAmt:'',
    likeCnt:'',
    pdImage:'',
    sexCd:'',
    note:''
}

function PdInfoByIdComponent({brandNo,categoryNo,itemNo,pdNo}) {

    const [pdInfo, setPdInfo] = useState(initState)

    useEffect(()=> {

        selectPdInfoByPdNo({brandNo,categoryNo,itemNo,pdNo}).then(data => {
            console.log(data)
            setPdInfo(data)
        })

    }, [brandNo,categoryNo,itemNo,pdNo])

    return (
        <div>
            {pdInfo.categoryNo}/
            {pdInfo.itemNo}/
            {pdInfo.brandNo}/
            {pdInfo.pdNo}/
            {pdInfo.pdName}/
            {pdInfo.startDate}/
            {pdInfo.endDate}/
            {pdInfo.buyAmt}/
            {pdInfo.likeCnt}/
            {pdInfo.pdImage}/
            {pdInfo.sexCd}/
            {pdInfo.note}

        </div>
    );
}

export default PdInfoByIdComponent;