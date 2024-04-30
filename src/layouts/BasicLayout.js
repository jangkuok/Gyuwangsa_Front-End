import React from 'react';
import MenuBar from '../components/MenuBar';
import SideMenu from '../components/menus/SideMenu';


function BasicLayout({children}) {
    return(
    <>
        <header>
            <MenuBar/>
        </header>

        <div className='my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            <aside>
               <SideMenu/>
            </aside>

            <main className='bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-40'>
                {children}
            </main>
        </div>

        
    </>
    );
}

export default BasicLayout;