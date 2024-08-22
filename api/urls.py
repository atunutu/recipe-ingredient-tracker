from django.urls import path
from . import views

urlpatterns = [
    path('get_recipes/', views.get_recipes, name='get_recipes'),
    path('add_ingredient/', views.add_ingredient, name='add_ingredient'),
    path('remove_ingredient/<int:ingredient_id>/', views.remove_ingredient, name='remove_ingredient'),
]
