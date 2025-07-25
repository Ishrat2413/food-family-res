import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featImg from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <section className="mx-10 text-white relative bg-fixed my-20"
            style={{
                backgroundImage: `url(${featImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="absolute inset-0 bg-black-opacity-50 z-0"></div>
            <div className="relative z-10">
                <SectionTitle
                    className="bg-transparent"
                    subHeading={"Check it Out"}
                    heading={"Featured Items"}>
                </SectionTitle>
                <div className="md:flex justify-center gap-x-10 items-center py-24 md:px-36 ">
                    <div>
                        <img src={featImg} alt="" />
                    </div>
                    <div>
                        <p className="pb-4">Aug 20, 2025</p>
                        <p className="uppercase font-bold pb-4">WHERE CAN I GET SOME?</p>
                        <p className="pb-4">At our family restaurant, we believe great food brings people together. Come enjoy a cozy dining experience with hand-crafted appetizers, homestyle meals, and mouthwatering desserts prepared with love. Whether it's a special occasion or a casual night out, our menu has something delicious for everyone!</p>
                        <button className="btn btn-outline text-lg border-0 border-b-4 mt-4 rounded-2xl hover:bg-black hover:text-white ">Order Now!</button>
                    </div>
                </div>
            </div>
        </section >
    );
};


export default Featured;