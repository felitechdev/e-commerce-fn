import Slider from "react-slick";
import SampleNextArrow from "../ProductsSections/SampleNextArrow";
import SamplePrevArrow from "../ProductsSections/SamplePrevArrow";

const ProductsSliderContainer = (props) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Display 6 products on web view
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1023, 
            settings: {
              slidesToShow: 5, 
            },
          },
          {
            breakpoint: 959, 
            settings: {
              slidesToShow: 4, 
            }
          },
          {
            breakpoint: 767, 
            settings: {
              slidesToShow: 3, 
            }
          },
          {
            breakpoint: 499, // Breakpoint for mobile view
            settings: {
              slidesToShow: 2, // Display 2 product on mobile view
            }
          },
          {
            breakpoint: 319, // Breakpoint for very small mobile view
            settings: {
              slidesToShow: 1, // Display 1 product on very small mobile view
            }
          },
          
        ],
    };
    
    return (
        <Slider {...settings} className="max-w-container mx-auto">
            { props.children }
        </Slider>
    )
}

export default ProductsSliderContainer;
