
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAccessToken, getUserAccessToken, getUserWithAccessToken } from '../../api/kakaoApi';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginSlice';
import UserCustomLogin from '../../hocks/userCustomLogin';

function KakaoRedirectPage(props) {

    const [searchParams] = useSearchParams()

    const authCode = searchParams.get('code')

    const dispatch = useDispatch()

    const { moveToPath } = UserCustomLogin()

    useEffect(() => {

        getAccessToken(authCode).then(accessToken => {
            getUserWithAccessToken(accessToken).then(user => {
                dispatch(login(user))
                if (user && user.note === '정보 수정 필요') {
                    moveToPath(`/user/modifyPage/${user.userId}`)
                    window.location.reload()
                } else {
                    window.location.replace("/")
                }
            })
        })

    }, [authCode])

    return (
        <div>

        </div>
    );
}

export default KakaoRedirectPage;