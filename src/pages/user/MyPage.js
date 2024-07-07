import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import MyPageComponet from '../../components/user/MyPageComponet';

function MyPage(props) {
    return (
        <BasicLayout>
           <MyPageComponet/>
        </BasicLayout>
    );
}

export default MyPage;