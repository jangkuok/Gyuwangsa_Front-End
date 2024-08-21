import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { selectListCategory } from '../../api/categoryApi';
import PageCustomMove from '../../hocks/pageCustomMove';
import { Cookies } from "react-cookie";

function SideMenu() {

  const [categoryList, setCategoryList] = useState([])
  const { pageList } = PageCustomMove();

  const cookie = new Cookies()
  const expires = new Date()
  expires.setUTCDate(expires.getUTCDate() + 1)

  useEffect(() => {
    selectListCategory().then(data => {
      setCategoryList(data)
    })
  }, [])

  const [open, setOpen] = useState(-1);

  const handleOpen = (value) => {
    setOpen(open === value ? -1 : value);
  };

  const [openBuger, setOpenBuger] = useState(false);

  return (
    <section className="flex gap-6">
      <Card className=" shadow-gray-400 sh-full w-full max-w-[20rem] p-1 ">
      <div
        className={`bg-white min-h-screen ${cookie.get('openBuger') ? "w-72" : "w-16"
          } duration-500 text-gray-700 px-4`}
      >
        <div className={`py-3 flex justify-end ${cookie.get('openBuger') && ""}`}>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            //onClick={() => setOpenBuger(!openBuger)}
            onClick={() => {setOpenBuger(!cookie.get('openBuger')); cookie.set('openBuger',!cookie.get('openBuger'),{expires:expires,path:'/'})}}
          />
        </div>
        <div className="mt-4 h-full flex flex-col gap-4 relative">
            <List>
              {categoryList.map((category, index) => (
                <Accordion key={index}
                  open={open === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${open === index ? "rotate-180" : ""}`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <AccordionHeader onClick={() => handleOpen(index)} className={`border-b-0  p-3 ${!cookie.get('openBuger') && "opacity-0 translate-x-28 overflow-hidden"}`}>
                      <div className="flex items-center justify-between pb-1">
                        <h3 className={`text-xs text-gray-900  whitespace-normal ${!cookie.get('openBuger') && "opacity-0 translate-x-28 overflow-hidden"}`}>
                          {category.categoryNm}
                        </h3>
                      </div>
                    </AccordionHeader>
                  </ListItem>
                  <hr className={`my-2 border-gray-400  ${!cookie.get('openBuger') && "opacity-0 translate-x-28 overflow-hidden"}`} />
                  <div className=' grid grid-cols-2'>
                    {category.pdItemList.map((item, i) => (
                      <AccordionBody className="py-0.5" key={i}>
                        <List className="p-0">
                          <ListItem>
                            <ul className={`text-xs lg:text-base text-[#767676]  ${!cookie.get('openBuger') && "opacity-0 translate-x-28 overflow-hidden"}`}
                              onClick={() => pageList({ categoryNo: category.categoryNo, itemNo: item.itemNo })}
                            >
                              <li className={`text-xs text-gray-400  whitespace-normal ${!cookie.get('openBuger') && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                {item.itemNm}
                              </li>
                            </ul>
                          </ListItem>
                        </List>
                      </AccordionBody>
                    ))}
                  </div>
                </Accordion>
              ))}
            </List>
        </div>
      </div>
      </Card>
    </section>
  );
}

export default SideMenu;