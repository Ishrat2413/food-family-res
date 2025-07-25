import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Food Family | Menu</title>
            </Helmet>
            <div className="">
                {/* Offered */}
                <Cover img={menuImg} title="Our Menu"></Cover>
                <SectionTitle subHeading="Do not Miss!" heading="Today's Offer"></SectionTitle>
                <div className="mx-auto max-w-[1440px]">
                    <MenuCategory
                        items={offered}
                        title="Menu Items"
                        coverImg={menuImg}
                    ></MenuCategory>
                </div>
                {/* Dessert Item */}
                <Cover img={dessertImg} title="desserts"></Cover>
                <div className="mx-auto max-w-[1440px]">
                    <MenuCategory
                        items={desserts}
                        title="desserts"
                    ></MenuCategory>
                </div>

                {/* Pizza Item */}
                <Cover img={pizzaImg} title="pizza"></Cover>
                <div className="mx-auto max-w-[1440px]">
                    <MenuCategory
                        items={pizza}
                        title="pizza"
                    ></MenuCategory>
                </div>

                {/* Salad Item */}
                <Cover img={saladImg} title="salad"></Cover>
                <div className="mx-auto max-w-[1440px]">
                    <MenuCategory
                        items={salad}
                        title="salad"
                    ></MenuCategory>
                </div>

                {/* Soup Item */}
                <Cover img={soupImg} title="soup"></Cover>
                <div className="mx-auto max-w-[1440px]">
                    <MenuCategory
                        items={soup}
                        title="soup"
                    ></MenuCategory>
                </div>
            </div>
        </div >
    );
};

export default Menu;