import React, { useState } from 'react';
import { modifyMemberChangePassword, selectMemberFindUserID, selectUserInfo } from '../../api/userApi';
import UserCustomLogin from '../../hocks/userCustomLogin';

const initState = {
    userId: '',
    pwd: '',
    name: '',
    email: '',
    phone: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    sexCd: '',
}

function UserFindComponent(props) {

    const [user, setUser] = useState(initState)

    const { moveToPath } = UserCustomLogin()

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [userId, setUserId] = useState('')

    const [pwdInput, setPwdInput] = useState(false)

    const [pwd, setPwd] = useState('')

    const handleFindName = (e) => {
        setName(e.target.value)
    }

    const handleFindEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleFindUserId = (e) => {
        setUserId(e.target.value)
    }

    const handleFindPwd = (e) => {
        setPwd(e.target.value)
    }

    const handleFindUserIdButton = () => {

        if (name === '' || email === '') {
            window.confirm('정보를 입력하세요.')
            return
        }
        selectMemberFindUserID(name, email).then((data) => {
            window.confirm('아이디는 [ ' + data + ' ] 입니다.')
            return
        })


    }

    const handleFindPasswordButton = () => {
        if (userId === '') {
            window.confirm('정보를 입력하세요.')
            return
        }
        selectUserInfo(userId).then((data) => {
            if (data.userId === null) {
                window.confirm('존재하는 아이디가 없습니다.')
                return
            }
            setPwdInput(true)
        })
    }
    const handleChangePasswordButton = () =>{
        if (pwd === '') {
            window.confirm('정보를 입력하세요.')
            return
        }
        user.userId = userId
        user.pwd = pwd

        modifyMemberChangePassword(user).then((data)=>{
            window.confirm('비밀번호가 변경을 완료 했습니다.')
            moveToPath("/loginPage")
        })

    }

    const textTpyeClass = 'text-base text-gray-500 font-semibold mb-2 block'

    return (
        <div>
            <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">GYUWANGSA</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">
                        아이디 찾기
                    </label>
                    <p className="mt-1 text-sm leading-6 text-gray-600">This is a page where you can find your ID.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        {/* 이름 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이  름
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleFindName}
                                    className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* 이메일 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이 메 일
                            </label>
                        </div>
                        <div className="sm:col-span-3">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleFindEmail}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <button type="button"
                                onClick={handleFindUserIdButton}
                                className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                검  색
                            </button>
                        </div>

                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">
                        비밀번호 찾기
                    </label>
                    <p className="mt-1 text-sm leading-6 text-gray-600">This is a page where you can find your password.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        {/* 아이디 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                아 이 디
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="userId"
                                id="userId"
                                onChange={handleFindUserId}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <button type="button"
                                onClick={handleFindPasswordButton}
                                className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                검  색
                            </button>
                        </div>

                        {/* 비밀번호 */}
                        {
                            pwdInput === true ?
                                <div className="sm:col-start-1">
                                    <label className={textTpyeClass}>
                                        새로운 비밀번호
                                    </label>
                                </div>
                                : <></>
                        }
                        {
                            pwdInput === true ?
                                <div className="sm:col-span-2">
                                    <input
                                        type="password"
                                        name="pwd"
                                        id="pwd"
                                        onChange={handleFindPwd}
                                        className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                                    />
                                </div>
                                : <></>
                        }

                        {
                            pwdInput === true ?
                                <div className="sm:col-span-1">
                                    <button type="button"
                                        onClick={handleChangePasswordButton}
                                        className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                        확  인
                                    </button>
                                </div>
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFindComponent;