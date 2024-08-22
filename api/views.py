import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Ingredient
from .serializers import IngredientSerializer
from django.shortcuts import render

# Create your views here.
@api_view(['GET'])
def get_recipes(request):
    ingredients = Ingredient.objects.all()
    ingredient_names = ','.join([ingredient.name for ingredient in ingredients])
    
    api_key = settings.SPOONACULAR_API_KEY
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredient_names}&apiKey={api_key}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        recipes = response.json()  # List of recipes from Spoonacular
        return Response(recipes)
    else:
        return Response({"error": "Failed to fetch recipes"}, status=response.status_code)

@api_view(['POST'])
def add_ingredient(request):
    serializer = IngredientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def remove_ingredient(request, ingredient_id):
    ingredient = Ingredient.objects.get(id=ingredient_id)
    ingredient.delete()
    return Response({"message": "Ingredient removed."})

