import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import UserJoinComponent from '../../components/user/UserJoinComponent';

function UserJoinPage(props) {
    return (
        <BasicLayout>
            <UserJoinComponent/>
        </BasicLayout>
    );
}

export default UserJoinPage;