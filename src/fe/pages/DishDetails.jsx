import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DishDetails = () => {
  const { dishId } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/indian-foods/${dishId}`);
        setDish(response.data);
      } catch (err) {
        setError("Error fetching dish details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [dishId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const ingredients = dish?.ingredients ? JSON.parse(dish.ingredients) : [];

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="my-8 py-3">
        <h1 className="text-3xl font-bold mb-4">{dish?.name}</h1>
        <p>
          <strong>Diet:</strong> {dish?.diet}
        </p>
        <p>
          <strong>Preparation Time:</strong>{" "}
          {dish?.prep_time ? `${dish.prep_time} minutes` : "N/A"}
        </p>
        <p>
          <strong>Cooking Time:</strong>{" "}
          {dish?.cook_time ? `${dish.cook_time} minutes` : "N/A"}
        </p>
        <p>
          <strong>Flavor Profile:</strong> {dish?.flavor_profile}
        </p>
        <p>
          <strong>Course:</strong> {dish?.course}
        </p>
        <p>
          <strong>State of Origin:</strong> {dish?.state}
        </p>
        <p>
          <strong>Region:</strong> {dish?.region}
        </p>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DishDetails;
