import React, {useState} from 'react';
import axios from 'axios';
import '../IngredientForm.css'

function IngredientForm({onIngredientAdded}){
    const[name, setName] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post('/api/add_ingredient/', {name})
        .then(response=>{
            onIngredientAdded(response.data);
            setName('');
        })
        .catch(error=>{
            console.error('There was an error adding the ingredient!', error); 
        });
    };

    return(
        <div className='form-container'>
        <h2>Add Ingredient</h2> 
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                placeholder='Enter an Ingredient'
            
            />
            <button type='submit'>Add Ingredient</button>

        </form>
        </div>
    );
}

export default IngredientForm;