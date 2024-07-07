import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import UserFindComponent from '../../components/user/UserFindComponent';

function UserFindPage(props) {
    return (
        <BasicLayout>
           <UserFindComponent/>
        </BasicLayout>
    );
}

export default UserFindPage;