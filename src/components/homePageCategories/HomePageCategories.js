import { useEffect, useState } from 'react';
import axios from 'axios';
import { HiChevronRight } from 'react-icons/hi2';
import { Loader } from '../../dashboard/Components/Loader/LoadingSpin';
import MenuIconWhite from '../../assets/images/menu-white.png';
import { Link } from 'react-router-dom';

export default function HomePageCategories() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = (element) => {
    setHoveredCategory(element);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`
        );

        if (response.status === 200) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.log('onCategorySelect error', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div
      className='flex flex-col gap-2 w-full bg-[#D9D9D970] h-full relative rounded'
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex items-center gap-3 p-2 rounded-t  bg-[#1D6F2B]'>
        <img src={MenuIconWhite} className='w-5 h-5' />
        <h3 className=' text-white text-lg'>Categories</h3>
      </div>

      {isLoading && !categories.length && (
        <div className='flex justify-center p-16'>
          <Loader />
        </div>
      )}

      {!isLoading && categories.length && (
        <div className='flex relative rounded h-full overflow-auto'>
          <ul className='w-full flex flex-col rounded-b'>
            {categories.map((category) => (
              <li
                className={`flex gap-4 cursor-pointer items-center justify-between hover:bg-[#1D6F2B] hover:text-white ${
                  hoveredCategory === category.name &&
                  'bg-[#1D6F2B] text-white '
                }`}
                key={category.name}
                onMouseEnter={() => handleMouseEnter(category.id)}
              >
                <Link
                  to={`shop/?category=${hoveredCategory}`}
                  className='capitalize-first w-full p-2'
                >
                  {category.name}
                </Link>{' '}
                {hoveredCategory === category.id && <HiChevronRight />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hoveredCategory && (
        <div className=' bg-gray-200 text-gray-700 pt-6  b-0 absolute min-h-full rounded left-full z-50'>
          <ul className='min-w-52 flex gap-2 flex-col'>
            {categories
              .find((cat) => {
                return cat.id === hoveredCategory;
              })
              .subCategories.map((subCat) => (
                <li
                  key={subCat.id}
                  className='w-full px-4 hover:underline cursor-pointer'
                >
                  <Link
                    to={`shop/?category=${hoveredCategory}&subcategory=${subCat.id}`}
                    className='capitalize'
                  >
                    {subCat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
