import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { paginationItems } from '../../constants';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../APIs/Product';
export const Search = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const ref = useRef();
  const { product, status, err } = useSelector((state) => state.product);
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (ref.current !== null && ref.current.contains(e.target) === false) {
        return setShowCategories(false);
      }
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [productstate, setProductstate] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      // If the search query is empty, show all categories
      setFilteredProducts([]);
    } else {
      // If there's a search query, filter the categories based on productName
      const filtered = paginationItems.filter((item) =>
        item.productName.toLowerCase().includes(query)
      );
      let prod =
        (productstate &&
          productstate.length > 0 &&
          productstate.filter((item) =>
            item.name.toLowerCase().includes(query)
          )) ||
        [];
      setFilteredProducts(prod);
    }
  };

  const currentPathName = location.pathname;

  // move to product on search
  const handleProductDetails = (id) => {
    const separatedRoute = currentPathName.split('/');
    if (separatedRoute[1] === 'accounts') {
      navigate('/accounts/product', {
        state: {
          productId: id,
        },
      });
    } else {
      navigate('/product', {
        state: {
          productId: id,
        },
      });
    }
  };

  let prod =
    (productstate &&
      productstate.length > 0 &&
      productstate.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
    [];

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(prod);
  }, [searchQuery]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
        .unwrap()
        .then((data) => {
          setProductstate(data);
          if (data) {
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [status, dispatch]);

  // Fetch user only when the component mounts
  useEffect(() => {
    if (!productstate.length) {
      dispatch(fetchProducts())
        .unwrap()
        .then((data) => {
          setProductstate(data);
          if (data) {
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, productstate]);

  return (
    <div className='relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl '>
      <input
        ref={ref}
        className='flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]'
        type='text'
        onChange={handleSearch}
        value={searchQuery}
        placeholder='Search your products here'
      />
      <FaSearch className='w-5 h-5' />
      {(searchQuery || showCategories) && (
        <div
          className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
        >
          {searchQuery
            ? filteredProducts.map((item) => (
                <div
                  onClick={() => {
                    handleProductDetails(item.id);
                    setShowCategories(true);
                    setShowSearchBar(true);
                    setSearchQuery('');
                  }}
                  key={item.id}
                  className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'
                >
                  <img
                    className='w-24'
                    src={item?.productImages?.productThumbnail?.url}
                    alt='productImg'
                  />
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-lg'>{item.name}</p>
                    <p className='text-xs'>{item.description}</p>
                    <p className='text-sm'>
                      Price:{' '}
                      <span className='text-primeColor font-semibold'>
                        ${item.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            : filteredProducts.map((item) => (
                <div
                  onClick={() => {
                    handleProductDetails(item.id);
                    setShowCategories(true);
                  }}
                  key={item._id}
                  className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'
                >
                  <img
                    className='w-24'
                    src={item?.productImages?.productThumbnail?.url}
                    alt='productImg'
                  />
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-lg'>{item.name}</p>
                    <p className='text-xs'>{item.description}</p>
                    <p className='text-sm'>
                      Price:{' '}
                      <span className='text-primeColor font-semibold'>
                        ${item.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};
