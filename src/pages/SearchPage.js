import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import SearchPageComponet from '../components/common/SearchPageComponet';

function SearchPage(props) {
    return (
        <BasicLayout>
            <SearchPageComponet/>
        </BasicLayout>
    );
}

export default SearchPage;