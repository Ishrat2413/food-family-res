import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderCoverImg from "../../../assets/shop/order.jpg"
import Cover from '../../Shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'desserts', 'drinks' ]
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>Food Family | Order Food</title>
            </Helmet>
            <Cover img={orderCoverImg} title="Order Now"></Cover>
            <div className='max-w-[1340px] mx-auto'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="text-center m-4">
                    <TabList className="border-b border-gray-200 flex justify-center gap-8">
                        {/* <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab> */}
                        <Tab className="bg-transparent border-none text-gray-500 cursor-pointer text-lg font-semibold py-4 px-0 relative uppercase tracking-wide hover:text-yellow-600 focus:outline-none selected:text-yellow-600 selected:after:content-[''] selected:after:absolute selected:after:bottom-[-1px] selected:after:left-0 selected:after:right-0 selected:after:h-[3px] selected:after:bg-yellow-600">
                            Salad
                        </Tab>
                        <Tab className="bg-transparent border-none text-gray-500 cursor-pointer text-lg font-semibold py-4 px-0 relative uppercase tracking-wide hover:text-yellow-600 focus:outline-none selected:text-yellow-600 selected:after:content-[''] selected:after:absolute selected:after:bottom-[-1px] selected:after:left-0 selected:after:right-0 selected:after:h-[3px] selected:after:bg-yellow-600">
                            Pizza
                        </Tab>
                        <Tab className="bg-transparent border-none text-gray-500 cursor-pointer text-lg font-semibold py-4 px-0 relative uppercase tracking-wide hover:text-yellow-600 focus:outline-none selected:text-yellow-600 selected:after:content-[''] selected:after:absolute selected:after:bottom-[-1px] selected:after:left-0 selected:after:right-0 selected:after:h-[3px] selected:after:bg-yellow-600">
                            Soup
                        </Tab>
                        <Tab className="bg-transparent border-none text-gray-500 cursor-pointer text-lg font-semibold py-4 px-0 relative uppercase tracking-wide hover:text-yellow-600 focus:outline-none selected:text-yellow-600 selected:after:content-[''] selected:after:absolute selected:after:bottom-[-1px] selected:after:left-0 selected:after:right-0 selected:after:h-[3px] selected:after:bg-yellow-600">
                            Desserts
                        </Tab>
                        <Tab className="bg-transparent border-none text-gray-500 cursor-pointer text-lg font-semibold py-4 px-0 relative uppercase tracking-wide hover:text-yellow-600 focus:outline-none selected:text-yellow-600 selected:after:content-[''] selected:after:absolute selected:after:bottom-[-1px] selected:after:left-0 selected:after:right-0 selected:after:h-[3px] selected:after:bg-yellow-600">
                            Drinks
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;