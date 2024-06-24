import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginPostAsync, logout } from '../slices/loginSlice';

function UserCustomLogin(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginState = useSelector(state => state.loginSlice)

    //로그인 여부
    const isLogin = loginState.userId ? true : false


    //로그인
    const doLogin = async (loginParam) => {
        console.log('로그인')
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    //로그아웃 
    const doLogout = () =>{
        console.log('hock 로그아웃')
        dispatch(logout())
        navigate({pathname:'/'},{replace:true})
    }

    //페이지 이동
    const moveToPath = (path) => {
        console.log('페이지 이동')
        navigate({pathname:path},{replace:true})
    }

    //로그인 페이지 이동
    const moveToLogin = () => {
        console.log('로그인 페이지 이동')
        navigate({pathname:'/loginPage'},{replace:true})
    }

    //로그인 페이지 이동 컴포넌트
    const moveToLoginReturn = () => {
        return <Navigate replace to="/loginPage"/>
    }

    return (
        {loginState,isLogin,doLogin,doLogout,moveToPath,moveToLogin,moveToLoginReturn}
    );
}

export default UserCustomLogin;