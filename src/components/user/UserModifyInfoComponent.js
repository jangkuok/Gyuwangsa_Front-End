import React, { useEffect, useState } from 'react';
import { modifyUserInfo, selectUserInfo } from '../../api/userApi';
import AddressPopModal from '../../hocks/addressPopModal';
import UserCustomLogin from '../../hocks/userCustomLogin';
import { useNavigate } from 'react-router-dom';


const initState = {
    userId: '',
    pwd: '',
    name: '',
    email: '',
    phone: '',
    addrNo: '',
    addr: '',
    addrDtl: '',
    pwd: 'n',
    sexCd: '',
}

function UserModifyInfoComponent(props) {

    const [user, setUser] = useState(initState)

    const { loginState } = UserCustomLogin()

    const navigate = useNavigate()


    useEffect(() => {
        selectUserInfo(loginState.userId).then((data) => {
            setUser(data)
            setAddress({ address: data.addr, zonecode: data.addrNo })
        })

    }, [loginState.userId])

    

    // 주소 검색
    const [address, setAddress] = useState({
        address: '',
        zonecode: ''
    });

    const [popup, setPopup] = useState(false);


    const handleAddressButton = (data) => {
        setPopup(!popup);
    }

    //정보 주입
    const handleChangeUser = (e) => {
        user[e.target.name] = e.target.value
        setUser({ ...user })
    }

    //정보 수정
    const handleModifyButton = () => {
        user.addrNo = address.zonecode
        user.addr = address.address

        const pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
        const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        const phonePattern = /^[0-9]{0,13}$/

        if (user.phone === '' || user.email === '' || user.addrNo === '' || user.addr === '' || user.addrDtl === '') {
            window.confirm('정보를 입력하세요.')
            return
        }

        if (user.joinType !== '카카오') {
            if (!pattern.test(user.pwd)) {
                window.confirm('비밀번호는 영어,숫자,특수문자로 이루어져야 하며 8글자 이상으로 입력하세요.')
                return
            }
        }

        if (!emailPattern.test(user.email)) {
            window.confirm('이메일 형식이 아닙니다.')
            return
        }

        if (!phonePattern.test(user.phone)) {
            window.confirm('핸드폰 번호는 숫자만 작성이 가능합니다.')
            return
        }

        console.log(user)

        modifyUserInfo(user).then(() => {
            console.log(user)
            window.confirm('회원 정보 수정을 완료했습니다.')
            navigate({ pathname: '/' }, { replace: true })
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
                    <label className="text-base text-gray-500 font-semibold mb-2 block">회원 정보 수정</label>
                    <p className="mt-1 text-sm leading-6 text-gray-600">This page is a member information modification page.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        {/* 아이디 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                아이디
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="userId"
                                id="userId"
                                value={user.userId}
                                onChange={handleChangeUser}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>

                        {/* 비밀 번호 */}
                        {user.joinType !== '카카오' ?
                            < div className="sm:col-start-1">
                                <label className={textTpyeClass}>
                                    비밀번호
                                </label>
                            </div>
                            : <></>}

                        {user.joinType !== '카카오' ?
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="pwd"
                                        id="pwd"
                                        onChange={handleChangeUser}
                                        placeholder="비밀번호 입력(영문, 숫자, 특수문자 8자리 이상 조합)"
                                        className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            : <></>}
                        {/* 이름 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이  름
                            </label>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-2">
                            <div className="mt-2">
                                {user.joinType === '카카오' ?
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={user.name}
                                        onChange={handleChangeUser}
                                        className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                    />
                                    :
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={user.name}
                                        onChange={handleChangeUser}
                                        className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 bg-gray-100"
                                        readOnly
                                    />
                                }
                            </div>
                        </div>
                        {/* 핸드폰 번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                핸드폰 번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={user.phone}
                                    onChange={handleChangeUser}
                                    placeholder="핸드폰 번호 입력"
                                    className="block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* 이메일 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                이메일
                            </label>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleChangeUser}
                                    placeholder="이메일 입력"
                                    className="block w-4/5 p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* 우편번호 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                우편번호
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                name="addrNo"
                                id="addrNo"
                                value={address.zonecode}
                                onChange={handleChangeUser}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>

                        <div className="sm:col-span-1">
                            <button type="button"
                                onClick={handleAddressButton}
                                className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                검  색
                            </button>
                            {popup && <AddressPopModal company={address} setcompany={setAddress} />}
                        </div>

                        {/* 주소 */}

                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                주  소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addr"
                                id="addr"
                                value={address.address}
                                onChange={handleChangeUser}
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 bg-gray-100'
                                readOnly
                            />
                        </div>
                        {/* 상세 주소 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                상세 주소
                            </label>
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                name="addrDtl"
                                id="addrDtl"
                                value={user.addrDtl}
                                onChange={handleChangeUser}
                                placeholder="상세 주소 입력"
                                className='block w-full p-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6'
                            />
                        </div>

                        {/* 성별 */}
                        <div className="sm:col-start-1">
                            <label className={textTpyeClass}>
                                성  별
                            </label>
                        </div>
                        <div className="sm:col-span-2 ">
                            <label className="text-base text-gray-500 font-semibold mb-2 mr-4">남</label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="sexCd"
                                    id="sexCd"
                                    value={'남'}
                                    onChange={handleChangeUser}
                                />
                            </label>
                            <label className="text-base text-gray-500 font-semibold mb-2 mr-4">여</label>
                            <label>
                                <input
                                    type="radio"
                                    name="sexCd"
                                    id="sexCd"
                                    value={'여'}
                                    onChange={handleChangeUser}
                                />

                            </label>
                        </div>
                    </div>

                </div>


                {/* 버튼 */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button"
                        className="rounded-md bg-gray-400 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleModifyButton}
                        className="rounded-md bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div >
    );
}

export default UserModifyInfoComponent;