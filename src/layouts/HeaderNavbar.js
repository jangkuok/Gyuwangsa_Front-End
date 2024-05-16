import React from "react";
import { Link} from "react-router-dom";
import HeaderNavbarButton from "./HeaderNavbarButton";

function HeaderNavbar (){


  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50 border-b-[1px] border-b-gray-200">
    <nav className="h-full px-4 max-w-container mx-auto relative">
      <div className="flex items-center justify-between h-full">
        <Link to="/">
          <div>
            <img className="w-32 object-cover" src={'/public_assets/GWS_LOG.png'} />
          </div>
        </Link>
      </div>
    </nav>
    <HeaderNavbarButton />
  </div>
                 

  
  );
}
export default HeaderNavbar;