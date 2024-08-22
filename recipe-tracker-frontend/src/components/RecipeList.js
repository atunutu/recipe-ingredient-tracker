import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../RecipeList.css'

function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (searchTriggered) {
      axios.get('/api/get_recipes/')
        .then(response => {
          setRecipes(response.data);
          setSearchTriggered(false); // Reset the trigger after fetching recipes
        })
        .catch(error => {
          console.error('There was an error fetching recipes!', error);
          setSearchTriggered(false); // Reset the trigger even if there's an error
        });
    }
  }, [searchTriggered, ingredients]); // Trigger the search when the state changes

  const searchRecipes = () => {
    setSearchTriggered(true); // Trigger the useEffect to fetch recipes
  };

  return (
    <div className='recipe-container'>
      <h2>Suggested Recipes</h2>
      <button onClick={searchRecipes}>Search Recipes</button>
      {recipes.length > 0 ? (
        <ul className='recipe-list'>
          {recipes.map(recipe => (
            <li key={recipe.id} className='recipe-item'>
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} width="100" />
            </li>
          ))}
        </ul>
      ) : (
        <p className='user-message'>No recipes found yet. Add ingredients and click "Search Recipes".</p>
      )}
    </div>
  );
}

export default RecipeList;
