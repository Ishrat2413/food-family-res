import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://food-family-res.onrender.com/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;