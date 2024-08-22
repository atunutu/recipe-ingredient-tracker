import React, { useState } from 'react';
import IngredientForm from './components/IngredientForm';
import IngredientList from './components/IngredientList';
import RecipeList from './components/RecipeList';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Recipe Suggestion and Ingredient Tracker</h1>
      <IngredientForm onIngredientAdded={addIngredient} />
      <IngredientList ingredients={ingredients} onIngredientRemoved={removeIngredient} />
      <RecipeList ingredients={ingredients} />
    </div>
  );
}

export default App;
