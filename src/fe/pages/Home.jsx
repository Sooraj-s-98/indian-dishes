import React from 'react';
import DishesList from '@components/DishesList';

const HomePage = () => {

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
