import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";


const getNum  = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const PageCustomMove = () => {
    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const [refresh, setRefresh] = useState(false)

    //param 값이 없으면 값 설정
    const page = getNum(queryParams.get('page'),1)
    const size = getNum(queryParams.get('size'),20)

    const queryDefault = createSearchParams({page,size}).toString()

    const pageList = (pageParam) =>{

        let queryStr = "";


        if(pageParam){
            const pageNum = getNum(pageParam.page,1)
            const sizeNum = getNum(pageParam.size,20)
            queryStr = createSearchParams({page:pageNum,size:sizeNum}).toString()
        }else{
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:'../categories/item', search:queryStr})
    }

    const modifyPage = (pdInfo) => {
        navigate({
            pathname:`../product/modify/${pdInfo.pdNo}`,
            search:queryDefault
        })
    }

    const movePagePdInfo = (pdNo) => {
        
        console.log("PAGE CUS")
        console.log(pdNo)
        navigate({
            pathname:`../product/${pdNo}`,
            search:queryDefault
        })
    }

    return {pageList,modifyPage,movePagePdInfo,page,size,refresh}

}

export default PageCustomMove;