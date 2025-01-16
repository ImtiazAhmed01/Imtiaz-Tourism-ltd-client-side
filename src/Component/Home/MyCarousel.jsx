import React from "react";
import slider1Image from '../../assets/SlideImg/20828_original.jpg'
import slider2Image from '../../assets/SlideImg/Tourism-FM-Article.jpg'
import slider3Image from '../../assets/SlideImg/Basis-of-tourism.webp'
import slider4Image from '../../assets/SlideImg/Tourists-enjoy-sunset-in-Oia-San-Torini-Greece.jpg'
const slidesData = [
    {
        id: "slide1",
        image: slider1Image,
        title: "Explore Bangladesh Like Never Before",
        description:
            "Discover hidden gems, breathtaking landscapes, and vibrant cultures with our personalized tour guides.",
    },
    {
        id: "slide2",
        image: slider2Image,
        title: "Plan Your Perfect Getaway",
        description:
            "Seamlessly organize your trips with our comprehensive planning tools and expert recommendations.",
    },
    {
        id: "slide3",
        image: slider3Image,
        title: "Your Trusted Travel Companion",
        description:
            "From transportation to accommodations, our platform ensures a hassle-free travel experience.",
    },
    {
        id: "slide4",
        image: slider4Image,
        title: "Start Your Adventure Today",
        description:
            "Embark on unforgettable journeys with our curated itineraries designed just for you.",
    },
];


const Slide = ({ id, image, title, description, prevSlide, nextSlide, handleRedirect }) => (
    <div id={id} className="carousel-item relative w-full">
        <img src={image} className="w-full h-[500px] object-cover rounded-lg" alt={title} />
        <div className="absolute inset-x-0 bottom-8 bg-opacity-80 bg-black text-white text-center py-6 px-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-2">{description}</p>

        </div>
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
            <a href={`#${prevSlide}`} className="btn btn-circle text-white shadow-md">❮</a>
            <a href={`#${nextSlide}`} className="btn btn-circle text-white shadow-md">❯</a>
        </div>
    </div>
);

const Carousel = ({ slides, handleRedirect }) => (
    <div className="carousel w-full">
        {slides.map((slide, index) => (
            <Slide
                key={slide.id}
                id={slide.id}
                image={slide.image}
                title={slide.title}
                description={slide.description}
                prevSlide={slides[(index - 1 + slides.length) % slides.length].id}
                nextSlide={slides[(index + 1) % slides.length].id}
                handleRedirect={handleRedirect}
            />
        ))}
    </div>
);

const MyCarousel = () => {
    const handleRedirect = () => {
        // Add your navigation logic here
        console.log("Redirecting to rooms...");
    };

    return <Carousel slides={slidesData} handleRedirect={handleRedirect} />;
};

export default MyCarousel;
