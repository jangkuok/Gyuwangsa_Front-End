import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function HeaderNavbarButton(props) {

  //const products = useSelector((state) => state.orebiReducer.products);
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="relative w-full lg:w-[300px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              // onChange={handleSearch}
              // value={searchQuery}
              placeholder="Search your products here"
            />
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbarButton;