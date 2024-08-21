import React, { useEffect, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { selectListCategory } from '../api/categoryApi';
import PageCustomMove from '../hocks/pageCustomMove';
import { Cookies } from "react-cookie";

function HeadCategory() {

    const [categoryList, setCategoryList] = useState([])
    const { pageList } = PageCustomMove();

    const cookie = new Cookies()
    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + 1)

    useEffect(() => {
        selectListCategory().then(data => {
            setCategoryList(data)
        })
    }, [])


    return (
        <div>
  
        </div>
    );
}

export default HeadCategory;

