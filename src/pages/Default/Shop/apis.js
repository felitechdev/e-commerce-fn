import axios from 'axios';

export const fetchProducts = async (queryString) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products${queryString}`
    );

    return res.data.data.products;
  } catch (err) {
    if (err?.response?.data?.message)
      throw new Error(err.response.data.message);
  }
};
