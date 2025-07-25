import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Cover = ({img, title}) => {
    return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
        <div
            className="hero h-[600px]"
        
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <Link to={`/order/${title}`} className="flex justify-center"><button className="btn btn-outline text-lg border-0 border-b-4 m-4 rounded-2xl hover:bg-black hover:text-white max-w-[480px] mx-auto">Order Now!</button></Link>
                </div>
            </div>
        </div>
    </Parallax>
    );
};

export default Cover;