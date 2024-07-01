import React, { useEffect, useState } from 'react';
import SideMenu from '../components/menus/SideMenu';
import HeaderNavbar from './HeaderNavbar';


function BasicLayout({ children }) {

    return (
        <>
            <div className='w-full mx-auto'>
                <HeaderNavbar />
                <div className="max-w-container mt-28 mx-auto px-4">
                    <div className="w-full h-full flex pb-20 gap-10">
                            <SideMenu />
                        <div className="w-full mt-2 mdl:w-[80%] lgl:w-[80%] h-full flex flex-col gap-10">
                            {children}
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default BasicLayout;