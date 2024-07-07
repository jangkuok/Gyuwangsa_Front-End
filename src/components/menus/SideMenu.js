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

import { ChevronRightIcon, ChevronDownIcon, ShoppingBagIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { selectListCategory } from '../../api/categoryApi';
import PageCustomMove from '../../hocks/pageCustomMove';

function SideMenu() {

    const [categoryList, setCategoryList] = useState([])
    const { pageList } = PageCustomMove();

    useEffect(() => {
        selectListCategory().then(data => {
            setCategoryList(data)
        })
    }, [])

    // const [open, setOpen] = React.useState(-1);

    // const handleOpen = (value) => {
    //     setOpen(open === value ? -1 : value);
    // };

    const [open, setOpen] = React.useState(-1);

    const handleOpen = (value) => {
        setOpen(open === value ? -1 : value);
    };

    return (
        <div className="w-96 h-full flex-auto gap-6 ">
            <Card className="h-[calc(100vh-1rem)] w-full max-w-[20rem] p-1 ">
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
                                <AccordionHeader onClick={() => handleOpen(index)} className="border-b-0 p-3">
                                    <div className="flex items-center justify-between pb-1">
                                        <h3 className="text-xs text-gray-900  whitespace-normal">
                                            {category.categoryNm}
                                        </h3>
                                    </div>
                                </AccordionHeader>
                            </ListItem>
                            <hr className="my-2 border-blue-gray-50 " />
                            <div className=' grid grid-cols-2'>
                                {category.pdItemList.map((item,i) => (
                                    <AccordionBody className="py-0.5" key={i}>
                                        <List className="p-0">
                                            <ListItem>
                                                <ul className="text-xs lg:text-base text-[#767676] "
                                                    onClick={() => pageList({ categoryNo: category.categoryNo, itemNo: item.itemNo })}
                                                >
                                                    <li className="text-xs text-gray-400  whitespace-normal">
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
            </Card>
        </div>



    );
}

export default SideMenu;