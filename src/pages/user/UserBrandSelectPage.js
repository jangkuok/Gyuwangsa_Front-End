import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import UserBrandSelectComponent from '../../components/user/UserBrandSelectComponent';

function UserBrandSelectPage(props) {
    return (
        <BasicLayout>
            <UserBrandSelectComponent/>
        </BasicLayout>
    );
}

export default UserBrandSelectPage;