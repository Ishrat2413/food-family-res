const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-[400px] mx-auto text-center m-5">
            <h1 className="text-yellow-600 py-1">---{subHeading}---</h1>
            <h1 className="text-3xl uppercase border-y-1 py-3">{heading}</h1>
        </div>
    );
};

export default SectionTitle;