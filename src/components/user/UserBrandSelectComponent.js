import React from 'react';
import { ImBold, ImUserPlus, ImUsers } from 'react-icons/im';
import { Link } from 'react-router-dom';

function UserBrandSelectComponent(props) {
    return (

        <div className="space-y-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 grid grid-cols-2 gap-5  ">

            <Link to='/userJoinPage?join=brand'>
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 mt-5 ">
                    <div className="mx-auto max-w-xs px-8">
                        {/* <p className="text-base font-semibold text-gray-600">Brand User Join</p> */}
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">브랜드</span>
                        </p>
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">회원 가입</span>
                        </p>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                            Common User Join
                        </p>
                    </div>
                </div>
            </Link>

            
            <Link to='/userJoinPage'>
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        {/* <p className="text-base font-semibold text-gray-600">Brand User Join</p> */}
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">일 반</span>
                        </p>
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">회원 가입</span>
                        </p>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                            Common User Join
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default UserBrandSelectComponent;