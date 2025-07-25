import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }
            // console.log(menuItem)
            // only admin can see it so axios secure anbo
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: 'success',
                    title: `${data.name} is Added to the Menu!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log('with img url', res.data)
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Add Items</title>
            </Helmet>
            <SectionTitle heading="Add An Item" subHeading="What's New?"></SectionTitle>
            <h2>Add Items</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            required
                            type="text" className="input w-full" placeholder="Recipe Name" />
                    </div>
                    <div className="flex gap-x-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number" className="input w-full" placeholder="Price" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <legend className="label">Recipe Details</legend>
                        <textarea {...register("recipe", { required: true })} className="textarea h-32 w-full" placeholder="Write here the details of the recipe"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                        <input {...register("image")} type="file" className="file-input file-input-ghost" />
                    </div>

                    <button className="btn bg-[#294626] text-white">Add Item <FaUtensils /></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;