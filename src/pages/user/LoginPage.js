import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import LoginComponent from '../../components/user/LoginComponent';



function LoginPage(props) {


    return (
        <BasicLayout>
            <LoginComponent />
        </BasicLayout>
    );
}

export default LoginPage;