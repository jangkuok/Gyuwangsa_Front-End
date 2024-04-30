import React from 'react';
import { Link } from 'react-router-dom';

function SideMenu(props) {
    return (
        <div>
            <Link to={'/categories/item/'}>상의</Link>
            <div>바지</div>
            <div>아웃터</div>
        </div>
    );
}

export default SideMenu;