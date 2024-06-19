

const BrandSlider = () => {
    var data = [
        {
            id: 1,
            img: "brand-1.png",
        },
        {
            id: 2,
            img: "brand-2.png",
        },
        {
            id: 3,
            img: "brand-3.png",
        },
        {
            id: 4,
            img: "brand-4.png",
        },
        {
            id: 5,
            img: "brand-5.png",
        },
        {
            id: 6,
            img: "brand-6.png",
        },
        {
            id: 7,
            img: "brand-1.png",
        },
        {
            id: 8,
            img: "brand-2.png",
        },
        {
            id: 9,
            img: "brand-3.png",
        },
        {
            id: 10,
            img: "brand-4.png",
        },
        {
            id: 11,
            img: "brand-5.png",
        },
        {
            id: 12,
            img: "brand-6.png",
        },
    ];

    return (
        <>
                {data.map((item, i) => (
                        <div key={i} className="brand-logo">
                            <img
                                className="img-grey-hover"
                                src={`assets/imgs/banner/${item.img}`}
                                alt=""
                            />
                        </div>
                ))}
        </>
    );
};

export default BrandSlider;
