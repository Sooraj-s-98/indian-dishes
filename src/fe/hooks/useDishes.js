import { useState, useEffect } from 'react';
import axios from 'axios';

const useDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/indian-foods/'); 
        setDishes(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  return { dishes, loading, error };
};

export default useDishes;
