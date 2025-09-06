// import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import { useLoaderData } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';
// import { FaUtensils } from 'react-icons/fa';

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateItem = () => {
//     const { name, category, recipe, price, _id } = useLoaderData()
//     const { register, handleSubmit } = useForm();
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();
//     const onSubmit = async (data) => {
//         // console.log(data)
//         // image upload to imgbb and then get an url
//         const imageFile = { image: data.image[0] }
//         const res = await axiosPublic.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         })
//         if (res.data.success) {
//             // now send the menu item data to the server
//             const menuItem = {
//                 name: data.name,
//                 category: data.category,
//                 price: parseFloat(data.price),
//                 recipe: data.recipe,
//                 image: res.data.data.display_url,
//             }
//             // console.log(menuItem)
//             // only admin can see it so axios secure anbo
//             const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
//             // console.log(menuRes.data)
//             if (menuRes.data.modifiedCount > 0) {
//                 // show success popup
//                 // reset();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: 'success',
//                     title: `${data.name} is Updated!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         }
//         // console.log('with img url', res.data)
//     };

//     return (
//         <div>
//             <SectionTitle heading="Update Item" subHeading="Refresh Information"></SectionTitle>
//             <div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="form-control w-full my-6">
//                         <label className="label">
//                             <span className="label-text">Recipe Name*</span>
//                         </label>
//                         <input
//                             {...register("name", { required: true })}
//                             required
//                             type="text"
//                             defaultValue={name}
//                             className="input w-full" placeholder="Recipe Name" />
//                     </div>
//                     <div className="flex gap-x-6">
//                         {/* category */}
//                         <div className="form-control w-full my-6">
//                             <label className="label">
//                                 <span className="label-text">Category*</span>
//                             </label>
//                             <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full">
//                                 <option disabled value="default">Select a Category</option>
//                                 <option value="salad">Salad</option>
//                                 <option value="pizza">Pizza</option>
//                                 <option value="soup">Soup</option>
//                                 <option value="dessert">Dessert</option>
//                                 <option value="drinks">Drinks</option>
//                             </select>
//                         </div>
//                         {/* price */}
//                         <div className="form-control w-full my-6">
//                             <label className="label">
//                                 <span className="label-text">Price*</span>
//                             </label>
//                             <input
//                                 {...register("price", { required: true })}
//                                 defaultValue={price}
//                                 type="number" className="input w-full" placeholder="Price" />
//                         </div>
//                     </div>
//                     {/* recipe details */}
//                     <div className="form-control">
//                         <legend className="label">Recipe Details</legend>
//                         <textarea {...register("recipe", { required: true })}
//                             defaultValue={recipe} className="textarea h-32 w-full" placeholder="Write here the details of the recipe"></textarea>
//                     </div>
//                     <div className="form-control w-full my-6">
//                         <input {...register("image")} type="file" className="file-input file-input-ghost" />
//                     </div>

//                     <button className="btn bg-[#294626] text-white">Update Item <FaUtensils /></button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateItem;


import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';
import { useState } from 'react';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price, image, _id } = useLoaderData()
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [imageMethod, setImageMethod] = useState('upload'); // 'upload' or 'url'
    const [imagePreview, setImagePreview] = useState(image);

    const onSubmit = async (data) => {
        let imageUrl = image; // Keep current image by default

        if (imageMethod === 'upload' && data.image[0]) {
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
        } else if (imageMethod === 'url' && data.imageUrl) {
            // Use direct image URL
            imageUrl = data.imageUrl;

            // Validate URL format
            try {
                new URL(imageUrl);
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid URL',
                    text: `Please provide a valid image URL ${e}`,
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
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: 'success',
                    title: `${data.name} is Updated!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: `Failed to update the menu item ${error}`,
            });
        }
    };

    const handleImageUrlChange = (e) => {
        setImagePreview(e.target.value);
    };

    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh Information"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            required
                            type="text"
                            defaultValue={name}
                            className="input input-bordered w-full"
                            placeholder="Recipe Name" />
                    </div>

                    <div className="flex gap-x-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select
                                defaultValue={category}
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
                                defaultValue={price}
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
                            defaultValue={recipe}
                            className="textarea textarea-bordered h-32 w-full"
                            placeholder="Write here the details of the recipe"
                        ></textarea>
                    </div>

                    {/* Image selection method */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Image Method</span>
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
                                <span className="label-text">Upload New Image</span>
                            </label>
                            <input
                                {...register("image")}
                                type="file"
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                            />
                            <label className="label">
                                <span className="label-text-alt">Leave empty to keep current image</span>
                            </label>
                        </div>
                    ) : (
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                {...register("imageUrl")}
                                type="url"
                                className="input input-bordered w-full"
                                placeholder="https://example.com/image.jpg"
                                defaultValue={image}
                                onChange={handleImageUrlChange}
                            />
                        </div>
                    )}

                    {/* Current Image Preview */}
                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Current Image</span>
                        </label>
                        <div className="border rounded-lg p-4 flex flex-col items-center">
                            <img
                                src={imagePreview}
                                alt="Current item"
                                className="max-h-40 object-contain mb-2"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className="text-sm text-gray-500">Current image preview</span>
                        </div>
                    </div>

                    <button className="btn bg-[#294626] text-white">Update Item <FaUtensils /></button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;