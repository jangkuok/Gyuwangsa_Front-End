import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom';

function Item() {

    const [queryParams] = useSearchParams()

    const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1
    const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10

    const queryStr = createSearchParams({page:page,size:size}).toString()

    return (
        <BasicLayout>
            <div>
                List
            </div>
            <div>--------{page}--------</div>
            <div>--------{size}--------</div>
        </BasicLayout>
    );
}

export default Item;