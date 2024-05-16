import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { selectListCategory } from '../../api/categoryApi';

function SideMenu() {

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        selectListCategory().then(data => {
            setCategoryList(data)
        })
    }, [])


    const [open, setOpen] = React.useState(-1);

    const handleOpen = (value) => {
        setOpen(open === value ? -1 : value);
    };

    return (
        <div className="w-96 h-full flex-auto gap-6 ">
            <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    품목
                </div>
                <List>
                    {categoryList.map((category, index) => (
                        <Accordion
                            open={open === index}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === index ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === index}>
                                <AccordionHeader onClick={() => handleOpen(index)} className="border-b-0 p-3">
                                    <div className="flex items-center justify-between pb-5">
                                        <h3 className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor duration-300">
                                            {category.categoryNm}
                                        </h3>
                                    </div>
                                </AccordionHeader>
                            </ListItem>
                            {category.pdItemList.map((item) => (
                                <AccordionBody className="py-1">
                                    <List className="p-0 grid grid-cols-2">
                                        <ListItem>
                                            <ul className="flex flex-col gap-y-1 text-sm lg:text-base text-[#767676]">
                                                <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-y-1 hover:text-primeColor hover:border-gray-400 duration-300">
                                                    {item.itemNm}
                                                </li>
                                            </ul>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            ))}
                        </Accordion>
                    ))}
                </List>
            </Card>
        </div>

    );
}

export default SideMenu;