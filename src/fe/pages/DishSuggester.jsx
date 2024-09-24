import React, { useState, useEffect } from "react";
import IngredientsMultiSelect from "@components/IngredientsMultiSelect";
import axios from "axios";
import { Item } from "@radix-ui/react-select";

const DishSuggester = () => {
  const [ingredients, setIngredients] = useState([]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedDish, setSuggestedDish] = useState([]);

  useEffect(() => {
   axios.get("/api/v1/ingredients")
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      axios
        .post("/api/v1/dishes", {
          ingredients: selectedIngredients.map((item) => item.ingredient),
        })
        .then((response) => {
          setSuggestedDish(response.data);
        })
        .catch((error) =>
          console.error("Error fetching suggested dish:", error)
        );
    }
  }, [selectedIngredients]);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="my-8 py-3">
        <h1 className="text-3xl font-bold mb-4">Dish Suggester</h1>
        <IngredientsMultiSelect
          ingredients={ingredients}
          onSelectionChange={setSelectedIngredients}
        />

        <div className="z-0">
          {suggestedDish.map((dish) => (
            <div key={dish.id}>
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
                {dish.ingredients &&
                  JSON.parse(dish.ingredients).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishSuggester;
