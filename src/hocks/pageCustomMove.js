import { useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import UserCustomLogin from "./userCustomLogin";


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
    const categoryNo = queryParams.get('categoryNo')
    const itemNo = queryParams.get('itemNo')
    

    const queryDefault = createSearchParams({page,size}).toString()

    const pageList = (pageParam) =>{
        
        let queryStr = ""
        let header = ""

        if(pageParam){
            const pageNum = getNum(pageParam.page,1)
            const sizeNum = getNum(pageParam.size,20)


 
            queryStr = createSearchParams({page:pageNum,size:sizeNum}).toString()

            navigate({pathname:`../product/item/${pageParam.categoryNo}/${pageParam.itemNo}`, search:queryStr})

        }else{
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:`../product/item/${pageParam.categoryNo}/${pageParam.itemNo}`, search:queryStr})
    }

    const modifyPage = (pdInfo) => {
        navigate({
            pathname:`../product/modify/${pdInfo.pdNo}`,
            search:queryDefault
        })
    }

    const movePagePdInfo = (num) => {
        
        navigate({
            pathname:`../product/info/${num}`,
            search:queryDefault
        })
    }

    return {pageList,modifyPage,movePagePdInfo,page,size,refresh,categoryNo,itemNo}

}

export default PageCustomMove;