import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items,title }) => {
    return (
        <div>
            {/* {title && <Cover img={coverImg} title={title}></Cover>} */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 m-12'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`} className="flex justify-center"><button className="btn btn-outline text-lg border-0 border-b-4 m-4 rounded-2xl hover:bg-black hover:text-white max-w-[480px] mx-auto">Order Now!</button></Link>
            
        </div>
    );
};

export default MenuCategory; 