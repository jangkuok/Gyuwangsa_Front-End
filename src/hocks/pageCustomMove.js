import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";


const getNum  = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const pageCustomMove = () => {
    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    //param 값이 없으면 값 설정
    const page = getNum(queryParams.get('page'),1)
    const size = getNum(queryParams.get('size'),10)

    const queryDefault = createSearchParams({page,size}).toString()

    const pageList = (pageParam) =>{

        let queryStr = "";

        if(pageParam){
            const pageNum = getNum(queryParams.get('page'),1)
            const sizeNum = getNum(queryParams.get('size'),10)
            queryStr = createSearchParams({pageNum,sizeNum}).toString()
        }else{
            queryStr = queryDefault
        }

        navigate({pathname:'../categories/item', search:queryDefault})
    }
    return {pageList}

}

export default pageCustomMove;