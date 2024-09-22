import React, { useState, useEffect } from "react";
import { Table } from "@ui/table";
import { Link } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DishesList = ({ dishes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(200);
  const [sortedDishes, setSortedDishes] = useState([...dishes]);
  const [sortColumn, setSortColumn] = useState(null);
  const [filters, setFilters] = useState({
    diet: "",
    state: "",
  });

  useEffect(() => {
    let filteredDishes = dishes;

    if (filters.diet)
      filteredDishes = filteredDishes.filter(
        (dish) => dish.diet.toLowerCase() === filters.diet.trim().toLowerCase()
      );

    if (filters.state)
      filteredDishes = filteredDishes.filter(
        (dish) =>
          dish.state.toLowerCase() === filters.state.trim().toLowerCase()
      );

    setSortedDishes(filteredDishes);
  }, [filters, dishes]);

  const handleSort = (column) => {
    const sorted = [...sortedDishes].sort((a, b) =>
      a[column] < b[column] ? -1 : 1
    );
    setSortedDishes(sorted);
    setSortColumn(column);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedDishes.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dish List</h2>

      <div className="flex space-x-4 mb-4"></div>

      {/* Dishes Table */}
      <Table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Dish Name</th>
            <th>Ingredients</th>
            <th>Diet</th>
            <th onClick={() => handleSort("prep_time")}>Prep Time</th>
            <th onClick={() => handleSort("cook_time")}>Cooking Time</th>
            <th>Flavor</th>
            <th>Course</th>
            <th onClick={() => handleSort("state")}>State</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((dish) => (
            <tr key={dish.id}>
              <td>
                <Link to={`/dish/${dish.id}`}>{dish.name}</Link>
              </td>
              <td>{JSON.parse(dish.ingredients).join(", ")} </td>
              <td>{dish.diet}</td>
              <td>{dish.prep_time ? `${dish.prep_time} mins` : ''} </td>
              <td>{dish.cook_time ? `${dish.cook_time} mins` : ''} </td>
              <td>{dish.flavor_profile}</td>
              <td>{dish.course}</td>
              <td>{dish.state}</td>
              <td>{dish.region}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={Math.ceil(sortedDishes.length / rowsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DishesList;
