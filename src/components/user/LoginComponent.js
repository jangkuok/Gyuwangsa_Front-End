import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userCustomLogin from '../../hocks/userCustomLogin';
import { getKakaoLoginLink } from '../../api/kakaoApi';

const initState = {
    userId: '',
    pwd: ''
}

function LoginComponent(props) {

    const [loginParam, setLoginParam] = useState({ ...initState })

    const { doLogin, moveToPath } = userCustomLogin()

    const textTpyeClass = 'text-base text-gray-500 font-semibold mb-2 block'
    const textClass = 'block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'


    const link = getKakaoLoginLink()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })
    }

    const loginButton = (e) => {
        doLogin(loginParam).then(data => {
            if (data.error) {
                alert("아이디와 비밀번호를 확인해주세요")
            } else {
                window.location.replace("/")
            }
        })
    }

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            doLogin(loginParam).then(data => {
                if (data.error) {
                    alert("아이디와 비밀번호를 확인해주세요")
                } else {
                    window.location.replace("/")
                }
            })
        }
      }

    const joinPage = () => {
        moveToPath("/userBrandSelectPage")
    }

    return (
        <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        GYUWANGSA
                    </h2>
                </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="userId" className={textTpyeClass}>
                        아이디
                    </label>
                    <div className="mt-2 mb-5">
                        <input
                            id="userId"
                            name="userId"
                            type="text"
                            onChange={handleChange}
                            value={loginParam.userId}
                            className={textClass}

                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className={textTpyeClass}>
                            비밀번호
                        </label>
                    </div>
                    <div className="mt-2 mb-5">
                        <input
                            id="pwd"
                            name="pwd"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={loginParam.pwd}
                            onKeyDown={(e) => activeEnter(e)}
                            className={textClass}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="mb-3 flex w-full h-10 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={loginButton}
                    >
                        로  그  인
                    </button>
                    <button
                        type="submit"
                        className="mb-3 flex w-full h-10 justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <Link to={link}>카카오 로그인</Link>

                    </button>
                    <button
                        type="submit"
                        className="flex w-full h-10 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={joinPage}
                    >
                        회원가입
                    </button>
                </div>
                <div className='justify-center'>
                    <Link to="/userFindPage" >
                        <p className="text-center mt-6 text-xs leading-5 text-gray-600">
                            아이디 찾기 / 비밀번호 찾기
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;