import axios from "axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";

const Card = ({ recipe }) => {
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = e.target.childNodes[1].data;

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)
      .then((res) => setData(res.data.meals[0]));
  };

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    } else {
      break;
    }
  }

  return (
    <div className="card">
      <img src={recipe.strMealThumb} alt={"image recette" + recipe.strMeal} />
      <div className="infos">
        <h2>{recipe.strMeal}</h2>
        <Popup
          className="popup-content"
          trigger={<button className="button"> Détails</button>}
          position="center"
        >
          <div>
            <p>{recipe.strMeal}</p>
            <br />
            <p>Origin : {recipe.strArea}</p>
            <br />
            <div className="inst">
              <p>Instructions : {recipe.strInstructions}</p>
              <p>
                Ingrédients & Measures :
                <br />
                {ingredients.slice(0, 20).map((item) => (
                  <>
                    -{item.ingredient}: {item.measure}
                    <br />
                  </>
                ))}
              </p>
              <br />
              <p>
                Video link : <br />
                {recipe.strYoutube}
              </p>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Card;
