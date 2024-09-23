import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "@pages/Home";
import DishDetails from '@pages/DishDetails';
import DishSuggester from "@pages/DishSuggester";

import "./index.css";

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dish/:dishId" element={<DishDetails />} /> 
          <Route path="/dishes/suggester" element={<DishSuggester />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

