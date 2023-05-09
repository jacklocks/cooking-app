import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Recipes = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
      .then((res) => setData(res.data.meals));
  }, [search]);

  return (
    <div>
      <div className="recipes">
        <h1>Recipes</h1>
        <input
          className="search"
          type="text"
          placeholder="enter a recipe name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="meal-container">
        {data.map((recipe, index) => (
          <Card key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
