import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SortPopover from "./SortPopover";

const DishesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dishes, setDishes] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const currentPageData = parseInt(searchParams.get("page")) || 1;
  const rowsPerPageData = parseInt(searchParams.get("per_page")) || 50;
  const sortData = searchParams.get("sort")?.split(".") || [];

  const [currentPage, setCurrentPage] = useState(currentPageData);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageData);
  const [sortState, setSortState] = useState({
    column: sortData[0] || "name",
    direction: sortData[1] || "desc",
  });

  const [rowCount, setRowCount] = useState(rowsPerPageData.toString());

  const fetchData = async () => {
    const url = `/api/v1/indian-foods?page=${searchParams.get(
      "page"
    )}&per_page=${searchParams.get("per_page")}&sort=${searchParams.get("sort")}`;

    try {
      const { data } = await axios.get(url);
      if (data && data.list) {
        setDishes(data.list);
        setTotalPage(data.last_page);
      } else {
        console.error("Error: 'list' is undefined in the response data.");
        setDishes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("per_page")) {
      setSearchParams({
        page: currentPage.toString(),
        per_page: rowsPerPage.toString(),
      });
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const updateSearchParams = (page, perPage = rowsPerPage) => {
    setSearchParams({ page, per_page: perPage.toString() });
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (!(nextPage <= totalPage)) return;
    setCurrentPage((current) => current + 1);
    updateSearchParams(nextPage, rowsPerPage);
  };

  const handlePreviousPage = () => {
    const nextPage = Math.max(currentPage - 1, 1);
    setCurrentPage((current) => Math.max(current - 1, 1));
    updateSearchParams(nextPage, rowsPerPage);
  };

  const handlePage = (page) => {
    setCurrentPage(() => page);
    updateSearchParams(page, rowsPerPage);
  };

  const handleRowCountChange = (value) => {
    setRowCount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchParams(currentPage, Number(rowCount));
    setRowsPerPage(Number(rowCount));
  };

  const pages = () => {
    if (!dishes) return;
    let pages = [];
    const nextPage = currentPage + 1 || 1;
    for (let i = 1; i <= (currentPage || 1); i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePage(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    if (nextPage <= totalPage) {
      pages.push(
        <PaginationItem key={(currentPage || 1) + 1}>
          <PaginationLink onClick={() => updateSearchParams(nextPage)}>
            {nextPage}
          </PaginationLink>
        </PaginationItem>
      );
      pages.push(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    return pages;
  };

  const handleSort = (column, direction) => {
    setSearchParams({
      page: currentPage.toString(),
      per_page: rowsPerPage.toString(),
      sort: `${column}.${direction}`,
    });
    setSortState({ column, direction });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dish List</h2>

      <div className="flex space-x-4 mb-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Select value={rowCount} onValueChange={handleRowCountChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select row count" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 border border-gray-300">
              <SelectItem value="10">10 rows</SelectItem>
              <SelectItem value="20">20 rows</SelectItem>
              <SelectItem value="30">30 rows</SelectItem>
              <SelectItem value="40">40 rows</SelectItem>
              <SelectItem value="50">50 rows</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Apply</Button>
        </form>
      </div>

      {/* Dishes Table */}
      <Table>
        <TableHeader className="w-[100px]">
          <TableRow>
            <TableHead>
              <div className="flex items-center justify-between">
                <span> Dish Name</span>
                <SortPopover column="name" handleSort={handleSort} />
              </div>
            </TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead>Diet</TableHead>
            <TableHead>
              <div className="flex items-center justify-between">
                <span> Prep Time</span>
                <SortPopover column="prep_time" handleSort={handleSort} />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-between">
                <span> Cooking Time</span>
                <SortPopover column="cook_time" handleSort={handleSort} />
              </div>
            </TableHead>
            <TableHead>Flavor</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dishes.map((dish) => (
            <TableRow key={dish.id}>
              <TableCell>
                <Link to={`/dish/${dish.id}`}>{dish.name}</Link>
              </TableCell>
              <TableCell>{JSON.parse(dish.ingredients).join(", ")} </TableCell>
              <TableCell>{dish.diet}</TableCell>
              <TableCell>
                {dish.prep_time ? `${dish.prep_time} mins` : ""}{" "}
              </TableCell>
              <TableCell>
                {dish.cook_time ? `${dish.cook_time} mins` : ""}{" "}
              </TableCell>
              <TableCell>{dish.flavor_profile}</TableCell>
              <TableCell>{dish.course}</TableCell>
              <TableCell>{dish.state}</TableCell>
              <TableCell>{dish.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={() => handlePreviousPage()}>
            <PaginationPrevious />
          </PaginationItem>

          {pages()}
          <PaginationItem onClick={() => handleNextPage()}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DishesList;
