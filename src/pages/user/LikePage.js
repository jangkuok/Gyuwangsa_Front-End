import React from 'react';
import UserLikeComponent from '../../components/user/UserLikeComponent';
import BasicLayout from '../../layouts/BasicLayout';

function LikePage(props) {
    return (
        <BasicLayout>
            <UserLikeComponent />
        </BasicLayout>
    );
}

export default LikePage;