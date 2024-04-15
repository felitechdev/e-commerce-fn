import {
  Button,
  Layout,
  Space,
  Typography,
  Table,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchSubCategory,
  fetchCategory,
} from '../../Apis/Categories';
import Cookies from 'js-cookie';
import { Loader } from '../Loader/LoadingSpin';

const { Title, Paragraph, Text } = Typography;

export const CategoryList = ({ onCategorySelect }) => {
  const [categorys, setCategorys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [gettoken, setGettoken] = useState(null);

  // udpate state change
  const [resetCategory, setResetCategory] = useState();

  //  access redux actions
  const { categories, loadcategory, errcategory } =
    useSelector((state) => state.category);

  const { subcategories, loadsubcategory, errsubcategory } =
    useSelector((state) => state.subcategory);
  const token = Cookies.get('token');
  const dispatch = useDispatch();

  // update get category state after crud operations
  const handleUpdatestate = (categoryId) => {
    const updatedCategories = categorys.filter(
      (category) => category.id !== categoryId
    );
    setCategorys(updatedCategories);
  };

  // implement redux
  useEffect(() => {
    if (loadcategory == true) {
      dispatch(fetchCategory(gettoken))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == 'sucess') {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {});
    }
  }, [loadcategory, dispatch, token]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!categorys.length) {
      dispatch(fetchCategory(gettoken))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == 'sucess') {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, categorys, gettoken]);

  useEffect(() => {
    const newData = categorys?.map((category) => ({
      key: `${category.id}`,
      name: category.name,
      subcategories: category?.subCategories,
      Joindate: new Date(
        `${category.createdAt}`
      ).toLocaleDateString(),
    }));
    setDataSource(newData);
    setFilteredData(newData); // Update filteredData as well
  }, [categorys]);

  useEffect(() => {
    if (token) {
      setGettoken(token);
    }
  }, [dispatch, token]);

  useEffect(() => {}, [resetCategory]);

  return (
    <div className=' '>
      {loadcategory ? (
        <>
          <Loader className=' text-primary flex items-center w-full justify-center' />
          <span className=' text-primary flex items-center  justify-center'>
            Loading....
          </span>
        </>
      ) : (
        <div
          className=' mt-4  p-10 cursor-pointer '
          style={{
            border: '1px solid #000',
            borderRadius: '8px',
          }}
        >
          {filteredData &&
            filteredData?.map((cat, index) => {
              return (
                <h2
                  key={index}
                  onClick={() => onCategorySelect(cat.key)}
                  className=' hover:text-primary cursor-pointer text-sm font-semibold'
                >
                  {cat.name}
                </h2>
              );
            })}
        </div>
      )}
    </div>
  );
};
