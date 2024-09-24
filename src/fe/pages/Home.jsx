import React from 'react';
import DishesList from '@components/DishesList';
// import useDishes from '@hooks/useDishes';

const HomePage = () => {
  // const { dishes, loading, error } = useDishes();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="my-8 py-3">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dish Explorer</h1>
        <DishesList  />
      </div>
    </div>
  );
};

export default HomePage;
