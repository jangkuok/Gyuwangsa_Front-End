import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import UserModifyInfoComponent from '../../components/user/UserModifyInfoComponent';

function UserModifyInfoPage(props) {
    return (
        <BasicLayout>
            <UserModifyInfoComponent/>
        </BasicLayout>
    );
}

export default UserModifyInfoPage;