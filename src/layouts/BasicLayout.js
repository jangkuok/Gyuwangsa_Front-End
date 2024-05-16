import React, { useEffect, useState } from 'react';
import SideMenu from '../components/menus/SideMenu';
import HeaderNavbar from './HeaderNavbar';
import HeaderNavbarButton from './HeaderNavbarButton';


function BasicLayout({ children }) {

    return (
        <>
            {/* <div className='w-full mx-auto'>
                    <HeaderNavbar />
                    <HeaderNavbarButton/>
                    <div className="max-w-container mx-auto px-4">
                            <SideMenu />
                            {children}
                    </div>
                </div> */}

            <div className='w-full mx-auto'>
                <HeaderNavbar />
                <div className="max-w-container mt-28 mx-auto px-4">
                    <div className="w-full h-full flex pb-20 gap-10">
                            <SideMenu />
                        <div className="w-full mt-2 mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* <header>
                <HeaderNavbar />
            </header>
            <main>
                <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
                    <h2 className="text-3xl font-semibold capitalize text-center my-8">
                        Or subscribe to the newsletter
                    </h2>
                    <main className=' md:w-2/3 lg:w-3/4 px-5 py-40'>
                        {children}
                    </main>
                </div>

            </main> */}

            {/* <div className='my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
                <aside>
               <SideMenu />
            </aside>
            </div> */}
        </>
    );
}

export default BasicLayout;