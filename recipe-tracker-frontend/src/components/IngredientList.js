import React from 'react';
import axios from 'axios';
import '../IngredientList.css'

function IngredientList({ ingredients, onIngredientRemoved }) {
  const removeIngredient = (id) => {
    axios.delete(`/api/remove_ingredient/${id}/`)
      .then(() => {
        onIngredientRemoved(id);
      })
      .catch(error => {
        console.error('There was an error removing the ingredient!', error);
      });
  };

  return (
    <div className="list-container">
      <h2>Your Ingredients</h2>
      <ul className="ingredient-list">
        {ingredients.map(ingredient => (
          <li key={ingredient.id} className="ingredient-item">
            <span>{ingredient.name}</span>
            <button onClick={() => removeIngredient(ingredient.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientList;
