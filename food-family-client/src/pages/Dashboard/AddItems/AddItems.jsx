import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [imageMethod, setImageMethod] = useState('upload'); // 'upload' or 'url'
    
    const onSubmit = async (data) => {
        console.log(data);
        
        let imageUrl = '';
        
        if (imageMethod === 'upload') {
            // Image upload to imgbb and then get a URL
            const imageFile = { image: data.image[0] };
            try {
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                
                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Image Upload Failed',
                        text: 'Please try again or use a direct image URL',
                    });
                    return;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: `Please try again or use a direct image URL ${error}`,
                });
                return;
            }
        } else {
            // Use direct image URL
            imageUrl = data.imageUrl;
            
            // Validate URL format
            try {
                new URL(imageUrl);
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid URL',
                    text: `Please try again later ${e}`,
                });
                return;
            }
        }
        
        // Now send the menu item data to the server
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl,
        };
        
        try {
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            
            if (menuRes.data.insertedId) {
                // Show success popup
                reset();
                setImageMethod('upload');
                Swal.fire({
                    position: "top-end",
                    icon: 'success',
                    title: `${data.name} is Added to the Menu!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Item',
                text: `Please try again later ${error}`,
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Add Items</title>
            </Helmet>
            <SectionTitle heading="Add An Item" subHeading="What's New?"></SectionTitle>
            
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            required
                            type="text" 
                            className="input input-bordered w-full" 
                            placeholder="Recipe Name" 
                        />
                    </div>
                    
                    <div className="flex gap-x-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select 
                                defaultValue="default" 
                                {...register("category", { required: true })} 
                                className="select select-bordered w-full"
                            >
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
                                type="number" 
                                className="input input-bordered w-full" 
                                placeholder="Price" 
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                    
                    {/* recipe details */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea 
                            {...register("recipe", { required: true })} 
                            className="textarea textarea-bordered h-32 w-full" 
                            placeholder="Write here the details of the recipe"
                        ></textarea>
                    </div>
                    
                    {/* Image selection method */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Image Method*</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="label cursor-pointer gap-2">
                                <input
                                    type="radio"
                                    name="imageMethod"
                                    className="radio"
                                    checked={imageMethod === 'upload'}
                                    onChange={() => setImageMethod('upload')}
                                />
                                <span className="label-text">Upload Image</span>
                            </label>
                            <label className="label cursor-pointer gap-2">
                                <input
                                    type="radio"
                                    name="imageMethod"
                                    className="radio"
                                    checked={imageMethod === 'url'}
                                    onChange={() => setImageMethod('url')}
                                />
                                <span className="label-text">Use Image URL</span>
                            </label>
                        </div>
                    </div>
                    
                    {/* Image input based on selection */}
                    {imageMethod === 'upload' ? (
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Upload Image*</span>
                            </label>
                            <input 
                                {...register("image", { required: imageMethod === 'upload' })} 
                                type="file" 
                                className="file-input file-input-bordered w-full" 
                                accept="image/*"
                            />
                        </div>
                    ) : (
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Image URL*</span>
                            </label>
                            <input 
                                {...register("imageUrl", { 
                                    required: imageMethod === 'url',
                                    pattern: {
                                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg))$/i,
                                        message: "Please enter a valid image URL"
                                    }
                                })} 
                                type="url" 
                                className="input input-bordered w-full" 
                                placeholder="https://example.com/image.jpg" 
                            />
                        </div>
                    )}
                    
                    {/* Image preview */}
                    {imageMethod === 'url' && watch("imageUrl") && (
                        <div className="form-control my-4">
                            <label className="label">
                                <span className="label-text">Image Preview</span>
                            </label>
                            <div className="border rounded-lg p-2 flex justify-center">
                                <img 
                                    src={watch("imageUrl")} 
                                    alt="Preview" 
                                    className="max-h-40 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <button className="btn bg-[#294626] text-white mt-6">
                        Add Item <FaUtensils className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;