import { useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";


const getNum  = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const BrandPageCustomMove = () => {
    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const [refresh, setRefresh] = useState(false)

    //param 값이 없으면 값 설정
    const page = getNum(queryParams.get('page'),1)
    const size = getNum(queryParams.get('size'),20)
    const categoryNo = queryParams.get('categoryNo')
    const itemNo = queryParams.get('itemNo')


    const queryDefault = createSearchParams({page,size}).toString()

    const pageList = (pageParam) =>{
        
        let queryStr = "";

        if(pageParam){
            const pageNum = getNum(pageParam.page,1)
            const sizeNum = getNum(pageParam.size,20)


 
            queryStr = createSearchParams({page:pageNum,size:sizeNum}).toString()


            if( categoryNo === 0 && itemNo === 0){
                navigate({pathname:`../brand/pdInfoList/${pageParam.brandNo}`, search:queryStr})
            }

            if( categoryNo !== 0 && itemNo === 0){
                navigate({pathname:`../brand/pdInfoList/${pageParam.brandNo}/${pageParam.categoryNo}`, search:queryStr})
            }

            if( categoryNo !== 0 && itemNo !== 0){
                navigate({pathname:`../brand/pdInfoList/${pageParam.brandNo}/${pageParam.categoryNo}/${pageParam.itemNo}`, search:queryStr})
            }
            

        }else{
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:`../brand/pdInfoList/${pageParam.brandNo}`, search:queryStr})
    }


    return {pageList}

}

export default BrandPageCustomMove;