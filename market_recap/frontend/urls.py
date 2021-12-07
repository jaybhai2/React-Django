from django.urls import path
from .views import index


urlpatterns = [

    path('', index),
    path('stock-profile/', index),
    path('stock-price/', index)
    
]
